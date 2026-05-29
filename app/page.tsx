"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Building2, User, Briefcase, Phone, Mail, MessageSquare, Loader2, CheckCircle2, Headset, PhoneCall } from "lucide-react";

export default function WebcallPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [metadata, setMetadata] = useState<any>({});

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    title: "",
    phone: "",
    email: "",
    inquiry: "",
  });

  useEffect(() => {
    // 수집 가능한 브라우저 기본 메타데이터 설정
    setMetadata({
      userAgent: navigator.userAgent,
      language: navigator.language,
      timestamp: new Date().toISOString(),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      url: window.location.href,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        contactInfo: {
          company: formData.company,
          name: formData.name,
          title: formData.title,
        },
        phone: formData.phone,
        email: formData.email,
        inquiry: formData.inquiry,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString(), // 갱신된 시간
        }
      };

      // 모의 REST API 호출
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("전송된 페이로드:", JSON.stringify(payload, null, 2));

      setIsSuccess(true);
    } catch (error) {
      console.error("API 호출 실패", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#030712] text-white z-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel bg-white/5 border border-white/10 rounded-3xl p-10 max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">접수 완료되었습니다</h2>
          <p className="text-gray-400 mb-8">
            담당자가 요청순으로 확인 후 입력해주신 연락처로 빠르게 회신 드리겠습니다.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({ company: "", name: "", title: "", phone: "", email: "", inquiry: "" });
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all"
          >
            새로운 문의 남기기
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-12 relative overflow-hidden bg-[#030712] text-white z-0">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-blue-900/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-900/15 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-12 items-start"
      >
        {/* Left Section: Intro */}
        <div className="pt-4 md:pt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* CI: AgenticWorks Helpdesk */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Headset className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold tracking-tight text-white/90">
                  AgenticWorks Helpdesk
                </span>
                <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 text-xs font-bold tracking-wider border border-red-500 uppercase">
                  dev
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
              플랫폼 <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">문의 사항</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
              AgenticWorks 관련하여 궁금하신 점은 무엇이든 문의해 주세요.
            </p>
          </motion.div>
        </div>

        {/* Right Section: Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass-panel bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* 1. 회사 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">회사</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="회사명을 입력해주세요"
                />
              </div>
            </div>

            {/* 2. 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">이름</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="성함을 입력해주세요"
                />
              </div>
            </div>

            {/* 3. 직함 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">직함</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="직급/직책을 입력해주세요"
                />
              </div>
            </div>

            {/* 4. 연락처 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">연락처</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-500" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>

            {/* 5. 이메일 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="example@agenticworks.co"
                />
              </div>
            </div>

            {/* 6. 문의사항 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">문의 내용</label>
              <div className="relative">
                <div className="absolute top-3 left-4 pointer-events-none">
                  <MessageSquare size={18} className="text-gray-500" />
                </div>
                <textarea
                  name="inquiry"
                  rows={3}
                  required
                  value={formData.inquiry}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  placeholder="요청하시는 서비스나 궁금한 점을 간략하게 남겨주세요."
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    접수 중...
                  </>
                ) : (
                  <>
                    <PhoneCall size={20} />
                    WebCall 연결
                  </>
                )}
              </span>
            </motion.button>
            <p className="text-center text-xs text-gray-500 mt-3">
              입력하신 정보는 상담 용도로 1년 후에 자동 삭제 됩니다.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </main>
  );
}
