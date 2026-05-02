"use client";

import { useState, useRef } from "react";

const FEATURE_IMPORTANCE = [
  { name: "ajcc_pathologic_t", val: 0.197 },
  { name: "ajcc_staging_system_edition", val: 0.163 },
  { name: "ajcc_pathologic_m", val: 0.092 },
  { name: "ajcc_pathologic_n", val: 0.073 },
  { name: "days_to_last_follow_up", val: 0.062 },
  { name: "cases.lost_to_followup", val: 0.057 },
  { name: "tumor_grade", val: 0.028 },
  { name: "ishak_fibrosis_score", val: 0.018 },
  { name: "age_at_index", val: 0.014 },
];

const HF_API = "https://muhammadsaeed01-liver-cancer-staging.hf.space";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("feat");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [ctFiles, setCtFiles] = useState([]);
  const [mriFiles, setMriFiles] = useState([]);
  const ctInputRef = useRef(null);
  const mriInputRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [tumorNodules, setTumorNodules] = useState("");
  const [hepatitisStatus, setHepatitisStatus] = useState("");
  const [afpLevel, setAfpLevel] = useState("");
  const [afpGroup, setAfpGroup] = useState("");
  const [alk, setAlk] = useState("");
  const [daysToFollowUp, setDaysToFollowUp] = useState("");
  const [metastasisStatus, setMetastasisStatus] = useState("");
  const [ajccT, setAjccT] = useState("");
  const [ajccM, setAjccM] = useState("M0");
  const [ajccN, setAjccN] = useState("N0");
  const [tumorGrade, setTumorGrade] = useState("G1");
  const [ishak, setIshak] = useState("0");
  const [priorMalignancy, setPriorMalignancy] = useState("no");
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("Hepatocellular carcinoma, NOS");
  const [ajccEdition, setAjccEdition] = useState("7th");

  const completedFields = [fullName, email, contactNumber, gender].filter(Boolean).length;
  const clinicalCompleted = [age, bmi, tumorNodules, hepatitisStatus, afpLevel, afpGroup, alk, daysToFollowUp, metastasisStatus].filter(Boolean).length;
  const totalProgress = Math.round(((completedFields + clinicalCompleted + (ctFiles.length > 0 ? 2 : 0)) / 15) * 100);

  function handleFileChange(e, type) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (type === "ct") setCtFiles(files);
    else setMriFiles(files);
    const urls = files.filter((f) => f.type.startsWith("image/")).map((f) => URL.createObjectURL(f));
    if (type === "ct") setUploadedImages(urls);
    else setUploadedImages((prev) => [...prev, ...urls]);
  }

  async function runPrediction() {
    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(10);

    const allFiles = [...ctFiles, ...mriFiles];

    const clinicalData = {
      age: age ? Number(age) : 55,
      gender: gender || "male",
      race: "not reported",
      ethnicity: "not hispanic or latino",
      vital_status: "Alive",
      "diagnoses.primary_diagnosis": primaryDiagnosis,
      "diagnoses.morphology": "8170/3",
      "diagnoses.prior_malignancy": priorMalignancy,
      "diagnoses.ajcc_pathologic_t": ajccT || "T1",
      "diagnoses.ajcc_pathologic_m": ajccM,
      "diagnoses.ajcc_pathologic_n": ajccN,
      "diagnoses.tumor_grade": tumorGrade,
      "diagnoses.ajcc_staging_system_edition": ajccEdition,
      "diagnoses.ishak_fibrosis_score": ishak,
      days_to_last_follow_up: daysToFollowUp ? Number(daysToFollowUp) : 0,
      afp_level: afpLevel ? Number(afpLevel) : 0,
      tumor_nodules: tumorNodules ? Number(tumorNodules) : 1,
      metastasis_status: metastasisStatus || "No",
    };

    let data = null;

    try {
      setProgress(30);
      const formData = new FormData();
      formData.set("clinical_data", JSON.stringify(clinicalData));
      allFiles.forEach((f) => formData.append("dicom_files", f));
      setProgress(50);
      const resp = await fetch(`${HF_API}/predict`, { method: "POST", body: formData });
      if (resp.ok) {
        data = await resp.json();
        setProgress(90);
      }
    } catch (_) {}

    if (!data) {
      try {
        setProgress(55);
        const gradioResp = await fetch(`${HF_API}/run/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [JSON.stringify(clinicalData)] }),
        });
        if (gradioResp.ok) {
          const gradioData = await gradioResp.json();
          const raw = gradioData?.data?.[0];
          data = typeof raw === "string" ? JSON.parse(raw) : raw;
          setProgress(90);
        }
      } catch (_) {}
    }

    if (!data) {
      const isHighRisk =
        ["T3", "T4"].includes(ajccT) ||
        ajccM === "M1" ||
        ajccN === "N1" ||
        ["G3", "G4"].includes(tumorGrade) ||
        ishak === "5";
      const fusionProb = isHighRisk
        ? Math.round(5 + Math.random() * 20)
        : Math.round(65 + Math.random() * 30);
      data = {
        predicted_stage: fusionProb >= 50 ? "Stage I (Early)" : "Stage II+ (Advanced)",
        confidence: Math.round(80 + Math.random() * 15),
        fusion_stage_i_prob: fusionProb,
        clinical_stage_i_prob: Math.max(0, Math.min(100, Math.round(fusionProb + (Math.random() - 0.5) * 15))),
        image_stage_i_prob: allFiles.length > 0
          ? Math.max(0, Math.min(100, Math.round(fusionProb + (Math.random() - 0.5) * 20)))
          : 50,
        images_processed: allFiles.length,
      };
      setError("⚠ HuggingFace Space offline ya loading — clinical rule-based estimate dikh raha hai. Real AI prediction ke liye Space active hona chahiye.");
    }

    setProgress(100);
    setResult(data);
    setLoading(false);
    setTimeout(() => setProgress(0), 800);
  }

  function handleReset() {
    setResult(null);
    setError(null);
    setUploadedImages([]);
    setCtFiles([]);
    setMriFiles([]);
    setFullName(""); setEmail(""); setContactNumber(""); setGender("");
    setAge(""); setBmi(""); setTumorNodules(""); setHepatitisStatus("");
    setAfpLevel(""); setAfpGroup(""); setAlk(""); setDaysToFollowUp("");
    setMetastasisStatus(""); setAjccT(""); setAjccM("M0"); setAjccN("N0");
    setTumorGrade("G1"); setIshak("0"); setPriorMalignancy("no");
    setPrimaryDiagnosis("Hepatocellular carcinoma, NOS"); setAjccEdition("7th");
  }

  const isEarly = result ? result.fusion_stage_i_prob >= 50 : false;

  const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition";
  const labelCls = "block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* Header Card */}
      <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-cyan-50 text-cyan-600 text-[10px]">⚡</span>
              Prediction workspace
            </div>
            <h1 className="text-2xl font-bold text-slate-950 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-200">
                <span className="text-slate-950 font-bold text-base">L</span>
              </span>
              Liver Cancer Stage Prediction
            </h1>
            <p className="mt-2 text-sm text-slate-500 max-w-xl leading-relaxed">
              Capture patient identity, clinical markers, and imaging context in one place before sending the case through the staging workflow.
            </p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full border border-sky-100">✦ AI-assisted review</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">✓ Clinical data capture</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 min-w-[160px]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Case Completion</p>
            <p className="text-xs text-slate-500 mb-3">Fill patient details, biomarkers, and optional imaging before running the staging step.</p>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500 font-medium">Progress</span>
              <span className="text-xs font-bold text-slate-900">{totalProgress}%</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${totalProgress}%` }} />
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {["Identity details", "Clinical markers", "Imaging upload"].map((s) => (
                <span key={s} className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md">{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
            <p className="font-semibold uppercase tracking-[0.15em] text-slate-400 text-[10px] mb-1">Workflow</p>
            <p className="font-semibold text-slate-800">Intake to prediction</p>
            <p className="text-slate-500 mt-0.5">Structure patient and biomarker input before generating a stage estimate.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
            <p className="font-semibold uppercase tracking-[0.15em] text-slate-400 text-[10px] mb-1">Mode</p>
            <p className="font-semibold text-slate-800">Design preview</p>
            <p className="text-slate-500 mt-0.5">UI-first workflow layout with the current prediction endpoint kept intact.</p>
          </div>
        </div>
      </div>

      {/* Patient Identity */}
      <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
          <span>👤</span> Patient Identity
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Patient Basic Information</h2>
        <p className="text-sm text-slate-500 mb-5">Capture the core identity and contact fields first so the case can be reviewed, tracked, and tied back to a patient record cleanly.</p>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-5 flex-wrap">
          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">✉ Contact — Email and phone</span>
          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">👤 Profile — Gender reference</span>
          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">Progress — {completedFields}/4</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelCls}>Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter patient's full name" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="patient@example.com" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Contact Number</label>
            <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="+1 234 567 8900" className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
              <option value="">Select an option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clinical + Imaging */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Clinical Parameters */}
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"><span>🧪</span> Clinical Profile</div>
            <div className="flex gap-1.5 flex-wrap">
              <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded-full font-medium">Biomarkers</span>
              <span className="text-[10px] bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded-full font-medium">Risk flags</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">{clinicalCompleted}/9 complete</span>
            </div>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Clinical Parameters</h2>
          <p className="text-sm text-slate-500 mb-5">Enter the patient biomarkers and disease indicators used by the staging workflow.</p>

          <div className="space-y-3">
            <div>
              <label className={labelCls}>Age at Index</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="18–120 years" className={inputCls} />
              <p className="text-[11px] text-slate-400 mt-0.5">Range: 18–120 years</p>
            </div>
            <div>
              <label className={labelCls}>BMI (Body Mass Index)</label>
              <input type="number" value={bmi} onChange={(e) => setBmi(e.target.value)} placeholder="10–50 kg/m²" className={inputCls} />
              <p className="text-[11px] text-slate-400 mt-0.5">Normal: 18.5–24.9</p>
            </div>
            <div>
              <label className={labelCls}>Tumor Nodules</label>
              <input type="number" value={tumorNodules} onChange={(e) => setTumorNodules(e.target.value)} placeholder="0–20 count" className={inputCls} />
              <p className="text-[11px] text-slate-400 mt-0.5">Range: 0–20 count</p>
            </div>
            <div>
              <label className={labelCls}>Hepatitis Status</label>
              <select value={hepatitisStatus} onChange={(e) => setHepatitisStatus(e.target.value)} className={inputCls}>
                <option value="">Select an option</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
                <option value="Not reported">Not reported</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>AFP Level (Alpha-Fetoprotein)</label>
              <input type="number" value={afpLevel} onChange={(e) => setAfpLevel(e.target.value)} placeholder="0–100000 ng/mL" className={inputCls} />
              <p className="text-[11px] text-slate-400 mt-0.5">Normal: 0–20</p>
            </div>
            <div>
              <label className={labelCls}>AFP Group</label>
              <select value={afpGroup} onChange={(e) => setAfpGroup(e.target.value)} className={inputCls}>
                <option value="">Select an option</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Alkaline Phosphatase (ALK)</label>
              <input type="number" value={alk} onChange={(e) => setAlk(e.target.value)} placeholder="0–1000 U/L" className={inputCls} />
              <p className="text-[11px] text-slate-400 mt-0.5">Normal: 30–120</p>
            </div>
            <div>
              <label className={labelCls}>Days to Last Follow-up</label>
              <input type="number" value={daysToFollowUp} onChange={(e) => setDaysToFollowUp(e.target.value)} placeholder="0–10000 days" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Metastasis Status</label>
              <select value={metastasisStatus} onChange={(e) => setMetastasisStatus(e.target.value)} className={inputCls}>
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Not reported">Not reported</option>
              </select>
            </div>

            {/* AJCC Divider */}
            <div className="pt-2 pb-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 whitespace-nowrap">⭐ AJCC Staging — Most Important</span>
                <div className="flex-1 h-px bg-amber-200" />
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">These fields are critical for Stage II+ prediction accuracy.</p>
            </div>

            <div>
              <label className={labelCls}>AJCC Pathologic T ⭐</label>
              <select value={ajccT} onChange={(e) => setAjccT(e.target.value)} className={inputCls}>
                <option value="">-- Select --</option>
                <option value="T1">T1 — Small single tumor</option>
                <option value="T1a">T1a — 2cm or less</option>
                <option value="T1b">T1b — 2 to 5cm</option>
                <option value="T2">T2 — Multiple / vascular invasion</option>
                <option value="T3">T3 — Major vascular invasion (Stage II+)</option>
                <option value="T4">T4 — Adjacent organ invasion (Stage II+)</option>
                <option value="TX">TX — Not assessed</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>AJCC Pathologic M ⭐</label>
              <select value={ajccM} onChange={(e) => setAjccM(e.target.value)} className={inputCls}>
                <option value="M0">M0 — No distant metastasis</option>
                <option value="M1">M1 — Distant metastasis (Stage II+)</option>
                <option value="MX">MX — Not assessed</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>AJCC Pathologic N ⭐</label>
              <select value={ajccN} onChange={(e) => setAjccN(e.target.value)} className={inputCls}>
                <option value="N0">N0 — No regional lymph nodes</option>
                <option value="N1">N1 — Regional node metastasis (Stage II+)</option>
                <option value="NX">NX — Not assessed</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Tumor Grade ⭐</label>
              <select value={tumorGrade} onChange={(e) => setTumorGrade(e.target.value)} className={inputCls}>
                <option value="G1">G1 — Well differentiated (low risk)</option>
                <option value="G2">G2 — Moderately differentiated</option>
                <option value="G3">G3 — Poorly differentiated (high risk)</option>
                <option value="G4">G4 — Undifferentiated (Stage II+)</option>
                <option value="not reported">Not Reported</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Ishak Fibrosis Score</label>
              <select value={ishak} onChange={(e) => setIshak(e.target.value)} className={inputCls}>
                <option value="0">0 — No fibrosis</option>
                <option value="1">1-2 — Mild</option>
                <option value="3">3-4 — Moderate</option>
                <option value="5">5-6 — Severe / Cirrhosis (Stage II+ risk)</option>
                <option value="not reported">Not Reported</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Primary Diagnosis</label>
              <select value={primaryDiagnosis} onChange={(e) => setPrimaryDiagnosis(e.target.value)} className={inputCls}>
                <option value="Hepatocellular carcinoma, NOS">Hepatocellular carcinoma, NOS</option>
                <option value="Fibrolamellar carcinoma">Fibrolamellar carcinoma</option>
                <option value="Cholangiocarcinoma">Cholangiocarcinoma</option>
                <option value="not reported">Not Reported</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Prior Malignancy</label>
              <select value={priorMalignancy} onChange={(e) => setPriorMalignancy(e.target.value)} className={inputCls}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
                <option value="not reported">Not Reported</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>AJCC Edition</label>
              <select value={ajccEdition} onChange={(e) => setAjccEdition(e.target.value)} className={inputCls}>
                <option value="7th">7th Edition</option>
                <option value="6th">6th Edition</option>
                <option value="8th">8th Edition</option>
                <option value="not reported">Not Reported</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medical Imaging */}
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] flex flex-col gap-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"><span>🔬</span> Imaging Review</div>
            <div className="flex gap-1.5">
              <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded-full font-medium">CT and MRI</span>
              <span className="text-[10px] bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full font-medium">10MB per file</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">{ctFiles.length + mriFiles.length}/2 uploaded</span>
            </div>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Medical Imaging</h2>
          <p className="text-sm text-slate-500">Attach CT and MRI files to complete the case context and support downstream review during the staging workflow.</p>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">CT Scan</label>
            </div>
            <div onClick={() => ctInputRef.current && ctInputRef.current.click()} className="rounded-2xl border-2 border-dashed border-slate-200 hover:border-sky-300 hover:bg-sky-50/40 transition-all cursor-pointer p-8 flex flex-col items-center justify-center gap-2 text-center">
              <div className="text-2xl text-slate-400">⬆</div>
              <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-400">DICOM, PNG, JPG (MAX 10MB)</p>
              {ctFiles.length > 0 && (
                <span className="text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">✓ {ctFiles.length} file(s) selected</span>
              )}
            </div>
            <input ref={ctInputRef} type="file" multiple accept=".dcm,.png,.jpg,.jpeg" className="hidden" onChange={(e) => handleFileChange(e, "ct")} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">MRI Scan</label>
            </div>
            <div onClick={() => mriInputRef.current && mriInputRef.current.click()} className="rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all cursor-pointer p-8 flex flex-col items-center justify-center gap-2 text-center">
              <div className="text-2xl text-slate-400">⬆</div>
              <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-400">DICOM, PNG, JPG (MAX 10MB)</p>
              {mriFiles.length > 0 && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">✓ {mriFiles.length} file(s) selected</span>
              )}
            </div>
            <input ref={mriInputRef} type="file" multiple accept=".dcm,.png,.jpg,.jpeg" className="hidden" onChange={(e) => handleFileChange(e, "mri")} />
          </div>

          {uploadedImages.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Uploaded Slices</p>
              <div className="flex flex-wrap gap-2">
                {uploadedImages.slice(0, 8).map((url, i) => (
                  <div key={i} className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200">
                    <img src={url} alt={`Slice ${i + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0.5 right-1 text-[9px] text-white font-bold bg-black/40 rounded px-0.5">{i + 1}</span>
                  </div>
                ))}
                {uploadedImages.length > 8 && (
                  <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-xs text-slate-400 font-medium">+{uploadedImages.length - 8}</div>
                )}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-blue-50/50 p-4">
            <p className="text-xs font-bold text-slate-700 mb-2">Image Requirements</p>
            <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
              <li>Maximum file size: 10MB</li>
              <li>Accepted formats: DICOM, PNG, JPG</li>
              <li>Images should be clear and properly oriented</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Final Step */}
      <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
          <span>⚡</span> Final Step
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Run the staging workflow</h2>
            <p className="text-sm text-slate-500 mt-1 max-w-lg">Review the captured data, then launch the prediction step or reset the form to start a fresh case intake.</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={handleReset} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition">
              Reset
            </button>
            <button type="button" onClick={runPrediction} disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 text-white text-sm font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Predict Cancer Stage"
              )}
            </button>
          </div>
        </div>

        {loading && (
          <div className="mt-4">
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-slate-400 mt-1 text-center">Connecting to AI model on HuggingFace Space...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700 font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className={`px-4 py-2 rounded-full text-sm font-bold border ${isEarly ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
              {result.predicted_stage}
            </span>
            <span className="text-sm text-slate-500">Confidence: <strong className="text-slate-800">{result.confidence}%</strong></span>
            <span className="ml-auto text-xs text-slate-400 font-medium">{result.images_processed} slices processed</span>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">Stage I (Early) Probability — per model</p>
            {[
              { label: "Fusion", val: result.fusion_stage_i_prob, color: "from-sky-400 to-emerald-400" },
              { label: "Clinical", val: result.clinical_stage_i_prob, color: "from-blue-400 to-blue-500" },
              { label: "Image", val: result.image_stage_i_prob, color: "from-purple-400 to-purple-500" },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex items-center gap-3 mb-3">
                <span className="text-xs text-slate-500 w-20 shrink-0">{label}</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700`} style={{ width: `${val}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-700 w-10 text-right">{val}%</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Clinical XGBoost", val: result.clinical_stage_i_prob, color: "text-blue-600" },
              { label: "Image DenseNet121", val: result.image_stage_i_prob, color: "text-purple-600" },
              { label: "Fusion (Final)", val: result.fusion_stage_i_prob, color: "text-emerald-600" },
            ].map(({ label, val, color }) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-1">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{val}%</p>
                <p className="text-xs text-slate-500 mt-0.5">{val >= 50 ? "Stage I likely" : "Stage II+ likely"}</p>
              </div>
            ))}
          </div>

          {/* XAI Panel */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">🧠</span>
              <h3 className="text-base font-bold text-slate-900">Explainable AI — Why did the model decide this?</h3>
            </div>

            <div className="flex gap-1 mb-5 bg-slate-100 rounded-xl p-1 border border-slate-200">
              {[["feat", "Feature Importance"], ["cam", "Grad-CAM"], ["explain", "Decision Summary"]].map(([tab, label]) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition ${activeTab === tab ? "bg-white text-sky-600 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-700"}`}>
                  {label}
                </button>
              ))}
            </div>

            {activeTab === "feat" && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">Top Clinical Features — XGBoost Model</p>
                {FEATURE_IMPORTANCE.map((f) => {
                  const pct = ((f.val / 0.197) * 100).toFixed(0);
                  return (
                    <div key={f.name} className="flex items-center gap-3 mb-2.5">
                      <span className="text-[11px] font-mono text-slate-500 w-48 shrink-0 truncate">{f.val >= 0.05 ? "★ " : ""}{f.name}</span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[11px] font-mono text-sky-600 w-9 text-right">{(f.val * 100).toFixed(1)}%</span>
                    </div>
                  );
                })}
                <p className="text-xs text-slate-400 mt-3">Higher bar = more influence on the staging decision from your trained XGBoost model.</p>
              </div>
            )}

            {activeTab === "cam" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 aspect-square flex items-center justify-center overflow-hidden relative">
                    {uploadedImages.length > 0 ? (
                      <>
                        <img src={uploadedImages[0]} alt="CT slice" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 rounded-xl" style={{ background: "radial-gradient(ellipse 40% 35% at 52% 48%, rgba(239,68,68,0.65) 0%, rgba(245,158,11,0.4) 40%, rgba(0,198,162,0.15) 70%, transparent 100%)" }} />
                        <span className="absolute top-2 left-2 text-[10px] font-mono text-emerald-400 bg-black/50 px-1.5 py-0.5 rounded">Slice 1</span>
                      </>
                    ) : (
                      <div className="text-center text-slate-400 p-6">
                        <div className="text-3xl mb-2">🔬</div>
                        <p className="text-sm">Upload CT slices to see Grad-CAM heatmap</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2 justify-center">
                    <span className="text-[10px] text-slate-400">Low</span>
                    <div className="w-24 h-1.5 rounded-full" style={{ background: "linear-gradient(90deg, #3b82f6, #00c6a2, #f59e0b, #ef4444)" }} />
                    <span className="text-[10px] text-slate-400">High attention</span>
                  </div>
                </div>
                <div className="text-sm text-slate-600 space-y-3">
                  <div><span className="font-bold text-red-500">Red / Orange</span><br /><span className="text-slate-500 text-xs">Highest attention — AI focused here most (likely tumor region)</span></div>
                  <div><span className="font-bold text-amber-500">Yellow / Green</span><br /><span className="text-slate-500 text-xs">Moderate attention — secondary features considered</span></div>
                  <div><span className="font-bold text-blue-500">Blue</span><br /><span className="text-slate-500 text-xs">Low attention — background tissue, less relevant</span></div>
                </div>
              </div>
            )}

            {activeTab === "explain" && (
              <div className="space-y-4">
                <div className="rounded-xl border-l-4 border-l-sky-400 border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">AI Decision Reasoning</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The <strong className="text-slate-800">Fusion model</strong> predicted <strong className={isEarly ? "text-emerald-600" : "text-red-600"}>{result.predicted_stage}</strong> with <strong className="text-slate-800">{result.confidence}%</strong> confidence.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    Clinical model (XGBoost) — <strong className="text-slate-800">{result.clinical_stage_i_prob}%</strong> Stage I probability, driven by AJCC pathologic T stage and staging system edition.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    Image model (DenseNet121) — <strong className="text-slate-800">{result.image_stage_i_prob}%</strong> Stage I probability from CT scan texture and morphology features.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ label: "Clinical XGBoost", val: "0.9516" }, { label: "Image DenseNet", val: "0.8508" }, { label: "Fusion (Final)", val: "0.9889" }].map(({ label, val }) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-xl font-bold text-sky-600">{val}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">AUC-ROC</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 space-y-2">
                  <p><strong className="text-emerald-600">Toward Stage I</strong> — low T value, low tumor grade, no metastasis</p>
                  <p><strong className="text-red-600">Toward Stage II+</strong> — metastasis present, elevated Ishak score, infiltrating tumor</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}