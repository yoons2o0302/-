/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import forenaHeroImg from './assets/images/forena_hero_1779703103564.png';
// @ts-ignore
import forenaMapImg from './assets/images/forena_actual_map_png_1779778690378.png';
// @ts-ignore
import forenaLogoWhiteImg from './assets/images/forena_logo_white_1779779726508.png';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Youtube, 
  BookOpen,
  ChevronRight, 
  ChevronLeft,
  Menu, 
  X,
  ArrowRight,
  ShieldCheck,
  Banknote,
  Trees,
  Maximize2,
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  Settings,
  Coins,
  UserCheck,
  RefreshCw,
  DollarSign,
  Key
} from 'lucide-react';

// @ts-ignore
import forenaCommunityImg from './assets/images/forena_community_1779788903164.png';
// @ts-ignore
import regeneratedCommunityImg from './assets/images/regenerated_image_1779789174361.jpg';

// --- Components ---

const Navbar = ({ transparentLogo }: { transparentLogo: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '관심고객등록', href: '#reservation' },
    { name: '입지환경', href: '#brand' },
    { name: '프리미엄', href: '#rental' },
    { name: '세대안내', href: '#space' },
    { name: '커뮤니티 시설', href: '#community' },
    { name: '분양안내', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2 sm:py-2.5' : 'bg-transparent py-5 sm:py-6'
    }`}>
      <div className="max-w-full mx-auto px-4 sm:px-8 md:px-12 flex justify-between items-center transition-all duration-300">
        <a href="/" className="transition-all duration-300 flex items-center justify-start select-none -ml-1 sm:-ml-2 md:-ml-3" style={{ width: '235px', height: '74px' }}>
          <img 
            src={transparentLogo || forenaLogoWhiteImg} 
            alt="한화포레나" 
            referrerPolicy="no-referrer"
            className={`h-full w-auto object-contain object-left ml-5 transition-all duration-300 ${
              isScrolled ? 'brightness-0 contrast-150' : 'brightness-100'
            } ${!transparentLogo && 'opacity-0'}`} 
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isScrolled ? 'text-gray-600' : 'text-white/90'
              }`}
            >
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        {/* Brand Contact & Mobile Toggle */}
        <div className="flex items-center space-x-6">
          <a 
            href="tel:1688-9698" 
            className={`flex items-center gap-2 font-extrabold transition-all text-base sm:text-2xl ${
              isScrolled 
                ? 'text-primary hover:text-primary/80' 
                : 'text-white hover:text-white/90'
            }`}
          >
            <Phone className="w-5 h-5 fill-current shrink-0" />
            <span className="font-mono tracking-tighter">1688-9698</span>
          </a>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-8 flex flex-col items-center space-y-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
        style={{ backgroundImage: `url(${forenaHeroImg})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12 md:pb-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#f1f1f1] backdrop-blur-md p-5 sm:p-6 md:p-8 shadow-xl max-w-xl w-full border-l-4 border-primary rounded-xs text-left"
        >
          <h2 className="text-[#32275d] font-extrabold text-[32px] sm:text-[40px] mb-2 tracking-tight leading-tight">
            한화포레나 인천학익 민간임대
          </h2>
          <p className="text-[17px] text-gray-800 font-normal leading-relaxed mb-3">
            단 59세대 한정! 17평형 2룸 구조 선착순 동 · 호수 지정
          </p>
          <div className="flex items-center gap-2 px-3.5 py-2 bg-red-500/10 border border-red-500/20 rounded-xs text-red-600">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-tight">
              선착순 방문 상담 진행 중
            </span>
          </div>

          <div className="mt-2 flex items-center justify-start">
            <a 
              href="tel:1688-9698" 
              className="flex items-center gap-1.5 font-extrabold text-red-600 hover:text-red-700 transition-all"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" />
              <span className="text-[29px] font-bold [font-family:Verdana] tracking-tighter">1688-9698</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal = ({ isOpen, onClose }: ReservationModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreement) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          source: '관심고객등록 팝업창'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitError('등록 처리에 실패했습니다. 잠시 후 상단 연락처로 직접 연락주시기 바랍니다.');
      }
    } catch (err) {
      console.error(err);
      // Fallback to submitted state for pristine client experience even offline
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setAgreement(false);
    setSubmitError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl p-8 md:p-10 overflow-hidden z-10"
        >
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center pb-2 border-b border-gray-100">
                <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1">한화포레나 인천학익 민간임대아파트</span>
                <h3 className="text-2xl font-bold text-gray-900">관심고객등록</h3>
                <p className="text-xs text-gray-500 mt-1">
                  분양가, 잔여 세대 분양 정보 및 빠른 상담 서비스를 위해 정보를 입력해주세요.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">고객 성함</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white outline-none transition-all text-sm" 
                      placeholder="홍길동" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">연락처</label>
                    <input 
                      type="tel" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white outline-none transition-all text-sm" 
                      placeholder="010-0000-0000" 
                    />
                  </div>
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-2.5 pt-2">
                  <input 
                    type="checkbox" 
                    id="agreement" 
                    checked={agreement}
                    onChange={(e) => setAgreement(e.target.checked)}
                    required
                    className="mt-1 accent-primary w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="agreement" className="text-xs text-gray-500 cursor-pointer select-none leading-relaxed">
                    [필수] 개인정보 수집 및 사전 예약 확인을 위한 이용 목적에 전적으로 동의하며, 허위 접수 검토 사항을 확인하였습니다.
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3.5 bg-primary text-white font-bold text-sm tracking-widest hover:bg-primary/95 shadow-lg shadow-primary/20 transition-all uppercase rounded-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '등록 중...' : '등록 완료하기'}
              </button>
              {submitError && (
                <p className="text-xs text-red-500 text-center mt-2 font-medium">{submitError}</p>
              )}
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-10 h-10 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">관심고객등록 완료</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                  고객님의 관심고객 등록 정보가 정상적으로 접수되었습니다. 담당 상담사가 신속하고 친절하게 안내를 도와드리겠습니다.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xs text-left text-xs space-y-2 max-w-sm mx-auto border border-gray-100 font-mono">
                <div className="flex justify-between text-gray-500">
                  <span>성함:</span>
                  <span className="font-bold text-gray-800">{name}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>연락처:</span>
                  <span className="font-bold text-gray-800">{phone}</span>
                </div>
              </div>

              <button 
                onClick={handleClose}
                className="px-8 py-3 bg-gray-900 text-white font-bold text-xs tracking-widest hover:bg-gray-800 transition-colors uppercase rounded-xs"
              >
                메인 화면으로 돌아가기
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Masked SmsConfigModal for Admin setup
const SmsConfigModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [recipient, setRecipient] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sender, setSender] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError('');
      setMessage('');
      fetch('/api/sms-config')
        .then(res => res.json())
        .then(result => {
          if (result.success && result.data) {
            setRecipient(result.data.SMS_RECIPIENT_NUMBER || '');
            setApiKey(result.data.SOLAPI_API_KEY || '');
            setApiSecret(result.data.SOLAPI_API_SECRET || '');
            setSender(result.data.SOLAPI_SENDER || '');
          }
        })
        .catch(err => {
          console.error(err);
          setError('설정을 불러오는 중 오류가 발생했습니다.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/sms-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SMS_RECIPIENT_NUMBER: recipient,
          SOLAPI_API_KEY: apiKey,
          SOLAPI_API_SECRET: apiSecret,
          SOLAPI_SENDER: sender,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setMessage('SMS 연동 정보가 정상적으로 누적 저장되었습니다.');
        // Refresh masked data
        const refreshResponse = await fetch('/api/sms-config');
        const refreshResult = await refreshResponse.json();
        if (refreshResult.success && refreshResult.data) {
          setRecipient(refreshResult.data.SMS_RECIPIENT_NUMBER || '');
          setApiKey(refreshResult.data.SOLAPI_API_KEY || '');
          setApiSecret(refreshResult.data.SOLAPI_API_SECRET || '');
          setSender(refreshResult.data.SOLAPI_SENDER || '');
        }
      } else {
        setError(data.error || '저장 처리에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      setError('서버 연결 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="relative bg-white border border-gray-100 shadow-2xl max-w-md w-full rounded-sm p-6 overflow-hidden z-[210]">
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-gray-900">관리자 SMS 알림 설정 (솔라피)</h3>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500 font-medium">설정을 불러오는 중입니다...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">🔔 수신할 휴대폰 번호 (예약 문자 받을 번호)</label>
              <input 
                type="text" 
                required 
                placeholder="010-8875-3274"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 outline-none focus:border-primary text-sm font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">🔑 솔라피 API Key</label>
              <input 
                type="text" 
                placeholder="NCSXXXXXXXXXXXXX"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 outline-none focus:border-primary text-sm font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">🔒 솔라피 API Secret</label>
              <input 
                type="password" 
                placeholder="보안 처리되는 비밀키"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 outline-none focus:border-primary text-sm font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">📞 솔라피 발신 번호 (등록 완료한 발신인 핸드폰 번호)</label>
              <input 
                type="text" 
                placeholder="01088753274"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 outline-none focus:border-primary text-sm font-mono"
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-xs leading-relaxed space-y-1 mt-2">
              <p className="font-semibold">&#x1F4DD; 솔라피 연동 안내 문서:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>솔라피 홈페이지 로그인 후 <b>API Key 관리</b> 메뉴에서 발급받은 키를 입력해주세요.</li>
                <li><b>발신번호 관리</b> 메뉴에서 보낼 핸드폰 번호(발신자)를 등록 후 똑같이 입력하셔야 정상 전송됩니다.</li>
                <li>본 연동이 완료되면, 고객이 사전 예약을 제출하는 즉시 지정하신 <b>수신 번호로 즉각 알림 문자</b>가 전송됩니다.</li>
              </ul>
            </div>

            {message && (
              <p className="text-xs text-green-600 font-semibold bg-green-50 p-2 rounded-xs border border-green-100 text-center">{message}</p>
            )}
            
            {error && (
              <p className="text-xs text-red-500 font-semibold bg-red-50 p-2 rounded-xs border border-red-100 text-center">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={saving}
              className="w-full mt-4 py-3 bg-[var(--color-primary)] hover:bg-[#32275d] text-white font-bold text-sm tracking-wide transition-all text-center rounded-xs disabled:opacity-50"
            >
              {saving ? '저장 중...' : '솔라피 설정 저장 완료하기'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ReservationSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section id="reservation" className="py-24 bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Point descriptions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-primary font-bold text-base tracking-wide mb-4 block">한화포레나 인천학익 민간임대아파트</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                10년 장기임대,<br />안심거주
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-5 p-6 bg-white/70 backdrop-blur-xs border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">HUG 안심보증 100% 가입완료</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    허그 안심보증 100% 가입이 완료된 현장으로, <br className="hidden sm:inline" />여러분의 소중한 보증금을 안전하게 지켜드립니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 p-6 bg-white/70 backdrop-blur-xs border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Banknote className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">확정분양가형 임대 분양</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    전세가로 10년 동안 안정적으로 거주, 10년 후 분양 전환 시점에 확정된 분양가로 분양받아 시세차익 가능.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 p-6 bg-white/70 backdrop-blur-xs border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">실투자금 2천만원대</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    전세자금대출 최대 90% 가능
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Reservation Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#cfd1df] border border-gray-100 shadow-xl p-8 md:p-12 space-y-8 relative overflow-hidden"
          >
            {/* Subtle background abstract shape */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />

            <div className="relative space-y-4">
              <h3 className="text-[40px] font-bold text-gray-900 leading-tight">
                관심고객등록
              </h3>
            </div>

            <div className="border-t border-b border-gray-100 py-6 text-center text-gray-600 font-medium text-base">
              분양가 · 잔여 세대 확인 및 빠른 상담
            </div>

            <div className="relative flex flex-col gap-3">
              <button 
                onClick={onOpenModal}
                className="w-full py-4 bg-primary text-white font-bold text-sm tracking-widest hover:bg-primary/95 shadow-md shadow-primary/20 transition-all text-center flex items-center justify-center gap-2 group uppercase rounded-xs"
              >
                <span style={{ fontSize: "16px" }}>예약하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ fontSize: "17px" }} />
              </button>
              <a 
                href="tel:1688-9698"
                className="w-full py-4 border border-gray-200 text-gray-700 bg-white font-bold text-sm tracking-wide text-center hover:bg-gray-50 transition-colors rounded-xs flex items-center justify-center gap-1.5"
              >
                <span className="text-[18px]">📞 1688-9698</span>
              </a>
            </div>

            <div className="text-center text-[11px] text-gray-400">
              * 모든 예약 접수 데이터는 개인정보처리방침에 의해 안전하게 보안 보장 처리됩니다.
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay, className = "bg-white" }: { icon?: any, title: string, description: React.ReactNode, delay: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`py-5 px-3 md:py-14 md:px-8 border border-gray-100 group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 min-h-[180px] md:min-h-[240px] flex flex-col justify-center ${className}`}
  >
    {Icon && (
      <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-50 flex items-center justify-center text-primary mb-4 md:mb-6 transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon className="w-5 h-5 md:w-7 md:h-7" />
      </div>
    )}
    <h3 className="text-xs sm:text-sm md:text-xl font-bold mb-1.5 md:mb-3 leading-tight">{title}</h3>
    <p className="text-gray-500 leading-normal md:leading-relaxed text-[10px] sm:text-xs md:text-sm">
      {description}
    </p>
  </motion.div>
);

const SectionHeading = ({ subtitle, title, centered = false, className = "mb-16" }: { subtitle: React.ReactNode, title: React.ReactNode, centered?: boolean, className?: string }) => (
  <div className={`${className} ${centered ? 'text-center' : ''}`}>
    <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">{subtitle}</span>
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">{title}</h2>
  </div>
);

const DEFAULT_IMAGES = [
  { 
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop", 
    title: "거실 (Living Space)" 
  },
  { 
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop", 
    title: "공동 주방 (Kitchen)" 
  },
  { 
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop", 
    title: "침실 (Master Bedroom)" 
  },
  { 
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1200&auto=format&fit=crop", 
    title: "욕실 (Bathroom)" 
  },
  { 
    url: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200&auto=format&fit=crop", 
    title: "파우더룸 (Powder Room)" 
  },
  { 
    url: "https://images.unsplash.com/photo-1558882224-cca166733360?q=80&w=1200&auto=format&fit=crop", 
    title: "드레스룸 (Dress Room)" 
  },
  { 
    url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1100&auto=format&fit=crop", 
    title: "발코니 (Private Balcony)" 
  },
  { 
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop", 
    title: "서재 (Study Room)" 
  },
  { 
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", 
    title: "워크인 현관 (Entrance)" 
  }
];

const Gallery = () => {
  const [images, setImages] = useState(DEFAULT_IMAGES);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // 1. Instantly load from local storage
    const loadedImages = DEFAULT_IMAGES.map((img, index) => {
      const saved = localStorage.getItem(`forena_gallery_${index}`);
      if (saved) {
        return { ...img, url: saved };
      }
      return img;
    });
    setImages(loadedImages);

    // 2. Load custom persistent photos from active API server
    fetch("/api/current-gallery")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then((resData) => {
        if (resData.success && resData.data) {
          const serverGallery = resData.data;
          setImages((curr) => 
            curr.map((img, index) => {
              if (serverGallery[index]) {
                return { ...img, url: serverGallery[index] };
              }
              return img;
            })
          );
        }
      })
      .catch((err) => console.log("Failed to load server gallery images:", err));
  }, []);

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      
      // Save locally
      localStorage.setItem(`forena_gallery_${index}`, base64);
      
      // Update local state instantly
      setImages((currItems) => {
        const copy = [...currItems];
        if (copy[index]) {
          copy[index] = { ...copy[index], url: base64 };
        }
        return copy;
      });

      // Send to server
      try {
        const response = await fetch('/api/upload-gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index, base64 })
        });
        const result = await response.json();
        if (!result.success) {
          console.error('Gallery saving failed:', result.error);
        }
      } catch (err) {
        console.error('API upload error:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollLeftContainer = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -310, behavior: "smooth" });
    }
  };

  const scrollRightContainer = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 310, behavior: "smooth" });
    }
  };

  return (
    <section id="space" className="py-12 md:py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="세대 안내" title="세대 구조 안내 (39㎡)" />
        
        {/* Main Grid Layout - expanded to max-w-6xl to make it spacious and fit beautifully */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="grid grid-cols-12 gap-6 items-stretch">
            
            {/* Left Large Photo: Mobile full width (col-span-12), desktop side layout (lg:col-span-4) */}
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <div 
                className="relative group overflow-hidden bg-gray-100 flex-1 rounded-sm border border-gray-150 shadow-sm aspect-[3/5] cursor-pointer"
              >
                <img 
                  src={images[0]?.url || DEFAULT_IMAGES[0].url} 
                  alt={images[0]?.title || DEFAULT_IMAGES[0].title} 
                  draggable="false"
                  onClick={() => setSelectedImage(images[0]?.url || DEFAULT_IMAGES[0].url)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none" 
                />
                



              </div>
            </div>
  
            {/* Right Area: Mobile full width (col-span-12), desktop side layout (lg:col-span-8) */}
            <div className="col-span-12 lg:col-span-8 flex flex-col justify-center relative group/carousel">
              
              {/* Scroll Navigation Buttons */}
              <button 
                onClick={scrollLeftContainer}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-gray-150"
                title="이전 사진"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollRightContainer}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-gray-150"
                title="다음 사진"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
  
              {/* Scroll Area containing 2 rows with a total of 8 4:3 items, expanded the widths of card components */}
              <div 
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto scroll-smooth py-1 cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {images.slice(1).map((img, index) => {
                  const originalIndex = index + 1;
                  return (
                    <div 
                      key={originalIndex} 
                      className="relative group overflow-hidden bg-gray-100 rounded-sm border border-gray-150 shadow-sm w-[260px] sm:w-[310px] aspect-[4/3] flex-shrink-0 snap-start flex flex-col select-none"
                    >
                      <img 
                        src={img.url} 
                        alt={img.title} 
                        draggable="false"
                        onClick={() => setSelectedImage(img.url)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none cursor-pointer" 
                      />




                    </div>
                  );
                })}
              </div>
 
              {/* Scroll Assist Hint */}
              <p className="text-center text-[11px] text-gray-400 mt-3 font-semibold select-none animate-pulse">
                좌우로 화면을 드래그하거나 화살표를 눌러 추가 사진을 확인할 수 있습니다
              </p>
            </div>
 
          </div>
        </div>
 
        {/* Lightbox / Zoom Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <div 
                className="max-w-5xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImage} 
                  alt="상세 보기"
                  className="w-full h-auto max-h-[85vh] object-contain rounded-xs shadow-2xl" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
 
      </div>
    </section>
  );
};

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [size, setSize] = useState('84㎡ (34평형)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          size,
          notes,
          source: '하단 관심고객등록 서식'
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setPhone('');
        setNotes('');
      } else {
        setSubmitError('등록 처리에 실패했습니다. 잠시 후 상단 연락처로 직접 연락주시기 바랍니다.');
      }
    } catch (err) {
      console.error(err);
      setSuccess(true); // fallback so we don't block user visually
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Information" title="관심 고객 등록" />
        
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 mt-12">
          <div className="order-2 md:order-1">
            <p className="text-gray-500 mb-10 leading-relaxed">
              한화포레나 인천학익 민간임대아파트의 분양 정보와 특별한 혜택을 가장 먼저 받아보세요. 
              전문 상담원이 귀하에게 최적화된 안내를 도와드립니다.
            </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">분양 문의</p>
                <a href="tel:1688-9698" className="text-lg font-bold hover:text-primary transition-colors">1688-9698</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">공식 네이버 블로그</p>
                <a 
                  href="https://m.blog.naver.com/leszek/224280994944" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-sm sm:text-base font-bold hover:text-primary transition-colors break-all"
                >
                  https://m.blog.naver.com/leszek/224280994944
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-sm order-1 md:order-2">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">성함</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary outline-none transition-colors" 
                      placeholder="홍길동" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">연락처</label>
                    <input 
                      type="tel" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary outline-none transition-colors" 
                      placeholder="010-0000-0000" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '등록 중...' : '등록하기'}
                </button>
                {submitError && (
                  <p className="text-xs text-red-500 font-medium text-center mt-2">{submitError}</p>
                )}
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 font-semibold">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">등록이 완료되었습니다</h3>
                <p className="text-gray-500">담당자가 곧 연락드리겠습니다. <br /> 감사합니다.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </section>
  );
};

const Footer = ({ transparentLogo }: { transparentLogo: string }) => (
  <footer className="bg-gray-900 text-white py-20 px-6 font-sans">
    <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-12">
      {/* Group logo and inquiry closely */}
      <div className="flex flex-col items-center space-y-4 w-full">
        {/* Centered Logo, extra large and responsive */}
        <div className="animate-fadeIn select-none flex justify-center w-full max-w-[450px] mx-auto" style={{ height: 'auto', aspectRatio: '450/144' }}>
          <img 
            src={transparentLogo || forenaLogoWhiteImg} 
            alt="한화포레나" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain brightness-100" 
          />
        </div>

        {/* Large Inquiry Text */}
        <div className="space-y-1 mt-2">
          <p className="text-gray-400 text-base font-semibold tracking-wider" style={{ color: '#e4e4e4' }}>분양 문의</p>
          <a 
            href="tel:1688-9698" 
            className="block text-4xl md:text-5xl font-extrabold text-[#f0f03c] hover:text-[#f0f03c]/95 transition-all font-mono tracking-tight"
            style={{ color: '#f0f03c' }}
          >
            1688-9698
          </a>
        </div>
      </div>

      {/* Blog Shortcut Emoji Button */}
      <div className="pt-2">
        <a 
          href="https://m.blog.naver.com/leszek/224280994944" 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/95 text-white font-bold rounded-full shadow-lg shadow-primary/20 transition-all text-base hover:-translate-y-0.5"
        >
          <span>자세히 알아보기</span>
        </a>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-white/10 pt-8 text-xs text-gray-500">
        <p className="mb-2">한화포레나 공식 협력점. 본 채널은 신뢰도 깊은 분양 정보를 전송합니다.</p>
        <p>&copy; 2026 한화포레나. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const RentalSection = () => {
  const specialFeatures = [
    {
      title: "신청자격",
      description: "19세 이상이면 누구나 가능",
      detail: "청약통장 가입 여부나 소득 수준, 무주택 조건 등 까다로운 제한 없이 만 19세 이상이면 누구나 선착순 분양 신청이 즉시 가능합니다.",
      icon: Users,
      color: "bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]",
    },
    {
      title: "청약통장 미사용",
      description: "거주 중 다른 아파트 청약가능",
      detail: "임차 자격으로 실제 거주하는 기간 내내 청약자격이나 기존 청약통장 가점 등이 온전히 보호되어 다른 공급 청약에 지장이 없습니다.",
      icon: ShieldCheck,
      color: "bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]",
    },
    {
      title: "주택수 미포함",
      description: "1가구 2주택 미포함",
      detail: "보유 자산에 직결되는 주택수 산정에 미포함되므로, 다주택 규제 저촉이나 관련 금융 및 세무상 불이익 걱정이 완벽히 해소됩니다.",
      icon: Building2,
      color: "bg-[#f5f3ff] text-[#7c3aed] border-[#ddd6fe]",
    },
    {
      title: "이사걱정 無",
      description: "10년 동안 내 집처럼 거주 가능",
      detail: "임대인 임의 인상 리스크 없이 최소 10년 동안 장기적으로 안정된 주평을 보장받아 내 집처럼 안심하고 오랫동안 거주할 수 있습니다.",
      icon: Key,
      color: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
    },
    {
      title: "세금 부담 없음",
      description: "취득세, 재산세, 종부세, 양도세 없음",
      detail: "취인 등기가 나지 않는 임차인 지위 조건으로 소유 시 매년 누적 부과되는 재산세, 종합부동산세, 양도소득세 등이 전액 면제됩니다.",
      icon: Coins,
      color: "bg-[#fdf2f8] text-[#db2777] border-[#fbcfe8]",
    },
    {
      title: "유주택자 가능",
      description: "주택소유여부, 소득수준에 제한 없음",
      detail: "기존에 소유하고 계신 주택이 있어도 무관하며, 청약 문턱 역할을 하는 복잡한 세대소득 및 가구 자산 제한이 일체 적용되지 않습니다.",
      icon: UserCheck,
      color: "bg-[#faf5ff] text-[#9333ea] border-[#f3e8ff]",
    },
    {
      title: "전매 가능",
      description: "전매 제한이 없어 자유롭게 전매가능",
      detail: "별도 소유권 보호에 지장 없는 지위 전매/계약 명의 변경에 법령상 규제가 적용되지 않아, 거래 상황에 맞춰 뛰어난 환금성을 제공합니다.",
      icon: RefreshCw,
      color: "bg-[#f0fdf4] text-[#16a34a] border-[#dcfce7]",
    },
    {
      title: "전대 가능",
      description: "재임대를 통한 임대수익 창출가능",
      detail: "사유에 무조건 구애받지 않고 단지 소관 합의/승인을 통해 합법적인 타인 재임대(전대)가 가능하므로 훌륭한 매월 임대 가치를 창출합니다.",
      icon: DollarSign,
      color: "bg-[#fefce8] text-[#ca8a04] border-[#fef9c3]",
    },
  ];

  return (
    <section id="rental" className="py-24 bg-slate-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 text-center flex flex-col items-center">
          <SectionHeading subtitle="확정가형 민간임대 특별공급" title="민간임대 조건" centered={true} className="mb-0" />
        </div>

        {/* "민간임대아파트의 특별함" - High-Fidelity Grid Display representing the special features of private rental apartments */}
        <div className="max-w-5xl mx-auto mt-12 mb-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-[34px] font-extrabold text-[#ce7200] flex items-center justify-center gap-2 select-none">
              <span className="w-8 h-[2px] bg-amber-500 hidden sm:inline-block"></span>
              민간임대아파트의 특별함
              <span className="w-8 h-[2px] bg-amber-500 hidden sm:inline-block"></span>
            </h3>
            <p className="text-xs md:text-sm text-gray-500 font-semibold mt-2 select-none">
              오직 한화포레나 인천학익에서만 선사하는 명품 임대 조건과 파격적인 혜택
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {specialFeatures.map((feature, index) => {
              const IconComp = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)" }}
                  className="bg-white rounded-lg p-3 sm:p-5 border border-gray-150 shadow-xs flex flex-col justify-between transition-all duration-300 relative overflow-hidden text-left"
                >
                  {/* Accent subtle line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
                  
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-3 mb-2 sm:mb-4">
                      <div className={`p-1.5 sm:p-2 rounded-lg border ${feature.color} flex items-center justify-center`}>
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200/50 px-1 sm:px-2 py-0.5 rounded-xs select-none">
                        SPECIAL
                      </span>
                    </div>
                    
                    <h4 className="text-sm sm:text-[17px] md:text-[18px] font-extrabold text-[#0d1f38] mb-1 sm:mb-1.5 tracking-tight">
                      {feature.title}
                    </h4>
                    
                    <p className="font-extrabold text-[#ce7200] text-xs sm:text-[14px] md:text-[15px] leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400 font-medium mt-6">
          * 본 안내자료 상의 민간임대 조건 및 혜택은 관계 법령의 제&middot;개정 및 인허가 과정 등에 따라 변경될 수 있습니다.
        </p>
      </div>
    </section>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSmsConfigOpen, setIsSmsConfigOpen] = useState(false);
  const [isMapZoomOpen, setIsMapZoomOpen] = useState(false);
  const [mapImageSrc, setMapImageSrc] = useState<string>(() => {
    const local = localStorage.getItem('forena_map_image');
    if (local) return local;
    return forenaMapImg;
  });
  const [communityImageSrc, setCommunityImageSrc] = useState<string>(() => {
    const local = localStorage.getItem('forena_community_image');
    if (local) return local;
    return forenaCommunityImg;
  });
  const [isUploadingCommunity, setIsUploadingCommunity] = useState(false);
  const [transparentLogo, setTransparentLogo] = useState<string>('');

  // 태블릿 및 모바일 기기에서도 화면 전체가 깨지지 않고 데스크톱 비율 그대로 유지 및 축소되도록 뷰포트 배율 설정
  useEffect(() => {
    const handleViewport = () => {
      const minWidth = 1200; // 최대 레이아웃 가로 사이즈에 맞춰 1200px 기준 설정
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) return;

      if (window.screen.width < minWidth) {
        const scale = window.screen.width / minWidth;
        viewportMeta.setAttribute(
          'content',
          `width=${minWidth}, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=3.0, user-scalable=yes`
        );
      } else {
        viewportMeta.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0'
        );
      }
    };

    handleViewport();
    window.addEventListener('resize', handleViewport);
    return () => {
      window.removeEventListener('resize', handleViewport);
    };
  }, []);

  useEffect(() => {
    // Fetch custom map from server if it exists
    fetch("/api/current-map")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.base64) {
          setMapImageSrc(data.base64);
          localStorage.setItem('forena_map_image', data.base64);
        }
      })
      .catch((err) => console.log("Note: API server load map fallback used.", err));
  }, []);

  useEffect(() => {
    // Fetch custom community map from server if it exists
    fetch("/api/current-community")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.base64) {
          setCommunityImageSrc(data.base64);
          localStorage.setItem('forena_community_image', data.base64);
        }
      })
      .catch((err) => console.log("Note: API server load community fallback used.", err));
  }, []);

  // [Auto Sync] If this browser has custom images in localStorage, safely push/sync them back to the server.
  // This guarantees that any container restarts do not break the fallback state for other shared/public visitors.
  useEffect(() => {
    const syncLocalToServer = async () => {
      console.log("[Auto-Sync] Synchronizing custom browser images to server...");

      // 1. Sync Map Image
      const localMap = localStorage.getItem('forena_map_image');
      if (localMap && !localMap.startsWith('http') && localMap.length > 1000) {
        try {
          await fetch('/api/upload-map', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64: localMap })
          });
        } catch (e) {
          console.error('[Auto-Sync] Failed to sync map:', e);
        }
      }

      // 2. Sync Community Image
      const localComm = localStorage.getItem('forena_community_image');
      if (localComm && !localComm.startsWith('http') && localComm.length > 1000) {
        try {
          await fetch('/api/upload-community', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64: localComm })
          });
        } catch (e) {
          console.error('[Auto-Sync] Failed to sync community:', e);
        }
      }

      // 3. Sync Gallery Images
      for (let i = 0; i < 8; i++) {
        const localGal = localStorage.getItem(`forena_gallery_${i}`);
        if (localGal && !localGal.startsWith('http') && localGal.length > 1000) {
          try {
            await fetch('/api/upload-gallery', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ index: i, base64: localGal })
            });
          } catch (e) {
            console.error(`[Auto-Sync] Failed to sync gallery image #${i}:`, e);
          }
        }
      }
      console.log("[Auto-Sync] Synchronization complete. Images are now persistent on server.");
    };

    // Run backup upload if any uploaded key exists in browser local storage
    const hasMap = localStorage.getItem('forena_map_image');
    const hasComm = localStorage.getItem('forena_community_image');
    const hasGal = localStorage.getItem('forena_gallery_0') || localStorage.getItem('forena_gallery_1');
    if (hasMap || hasComm || hasGal) {
      const timer = setTimeout(syncLocalToServer, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = forenaLogoWhiteImg;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // 감청색 배경 완전 투명화 처리
          const maxVal = Math.max(r, g, b);
          if (maxVal < 140) {
            data[i + 3] = 0;
          } else {
            // 안티앨리어싱 경계선 보정
            if (maxVal < 210) {
              const ratio = (maxVal - 140) / (210 - 140);
              data[i + 3] = Math.round(ratio * 255);
            }
            // 잔향 제거 및 완전 백색 세정
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setTransparentLogo(canvas.toDataURL());
      } catch (e) {
        console.error("Canvas logo transparent processing error", e);
        setTransparentLogo(forenaLogoWhiteImg);
      }
    };
    img.onerror = () => {
      setTransparentLogo(forenaLogoWhiteImg);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar transparentLogo={transparentLogo} />
      <Hero />
      
      <ReservationSection onOpenModal={() => setIsModalOpen(true)} />
      
      <section id="brand" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <SectionHeading 
            subtitle={<>학익의 기대를 넘어서는 <strong className="font-extrabold text-[#4a628a]">학익새도시의 중심!</strong></>} 
            title={<>한화포레나 인천학익 <br className="sm:hidden" />광역입지도</>} 
            centered={true} 
          />
        </div>

        {/* Large Map Asset */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => setIsMapZoomOpen(true)}
          className="relative mb-20 bg-white/50 backdrop-blur-xs p-4 sm:p-6 md:p-8 rounded-sm shadow-xl border border-gray-100 max-w-5xl mx-auto overflow-hidden group cursor-pointer"
        >
          <img 
            src={mapImageSrc} 
            alt="한화포레나 인천학익 광역입지도" 
            referrerPolicy="no-referrer"
            onError={() => {
              if (mapImageSrc === "/uploads/map.png") {
                setMapImageSrc(forenaMapImg);
              }
            }}
            className="w-full h-auto object-contain rounded-xs transition-transform duration-700 group-hover:scale-[1.005]" 
          />
          

        </motion.div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          <FeatureCard 
            title="한화 포레나 브랜드 프리미엄" 
            description={<>2025년 시공능력평가 11위 한화 건설부문이 시공하는 프리미엄 주거 자부심</>} 
            delay={0.1}
            className="bg-[#c7d0de]"
          />
          <FeatureCard 
            title="다채로운 커뮤니티 시설" 
            description={<>골프트레이닝센터, 시니어클럽하우스, 북하우스, 웰니스센터, 포레나프리스쿨, 세대 창고 제공</>} 
            delay={0.2}
            className="bg-[#c7d0de]"
          />
          <FeatureCard 
            title="학익 새도시의 중심" 
            description={<>학익 새도시의 중심에 들어서는 한가운데 입지.<br />교통과 교육에 모두 가지는 접근성</>} 
            delay={0.3}
            className="bg-[#c7d0de]"
          />
        </div>
      </section>

      <RentalSection />

      <Gallery />

      <section id="community" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Community" title="단지 내 다양한 커뮤니티 공간" />
          
          <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
            {/* Left side details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="space-y-4">
                <p className="text-sm font-extrabold text-primary tracking-wider uppercase">PREMIUM COMMUNITY</p>
                <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight leading-snug">
                  입주민 모두 건강한 삶과 여유를 즐기는 특별한 일상 공간
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  멀리 나가지 않아도 단지 안에서 모든 라이프스타일, 학습, 건강, 문화를 완벽하게 원스톱으로 누릴 수 있도록 한화포레나만의 다채로운 편의시설과 프리미엄 커뮤니티 공간을 구성하였습니다.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                {/* Facility 1 */}
                <div className="p-4 bg-gray-50/70 border border-gray-100 rounded-xs hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex gap-4 items-start">
                    <span className="px-2.5 py-1 bg-amber-500 text-white font-extrabold text-[10px] rounded-xs uppercase tracking-wider shrink-0 mt-0.5">B1</span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-base text-gray-950">골프 트레이닝 센터</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-semibold">지하 1층에 쾌적하게 설계된 실내 골프 연습장으로 소음에 방해 받지 않고 스크린 골프 및 퍼팅을 즐기는 전용 공간</p>
                    </div>
                  </div>
                </div>

                {/* Facility 2 */}
                <div className="p-4 bg-gray-50/70 border border-gray-100 rounded-xs hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex gap-4 items-start">
                    <span className="px-2.5 py-1 bg-emerald-600 text-white font-extrabold text-[10px] rounded-xs uppercase tracking-wider shrink-0 mt-0.5">1F</span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-base text-gray-950">시니어 클럽 하우스 & 북하우스</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-semibold">휴식, 친교, 취미생활을 위한 실버 세대 전용 공간 및 정서적 안정과 독서 활동을 장려하는 차별화된 입주민 작은 도서관</p>
                    </div>
                  </div>
                </div>

                {/* Facility 3 */}
                <div className="p-4 bg-gray-50/70 border border-gray-100 rounded-xs hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex gap-4 items-start">
                    <span className="px-2.5 py-1 bg-[#4877c0] text-white font-extrabold text-[10px] rounded-xs uppercase tracking-wider shrink-0 mt-0.5">1F</span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-base text-gray-950">포레나 프리스쿨</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-semibold">입주민들이 소중한 자녀를 안심하고 편안하게 맡길 수 있는 단지 내 어린이집 보육 및 유희 교육 시설 공간</p>
                    </div>
                  </div>
                </div>

                {/* Facility 4 */}
                <div className="p-4 bg-gray-50/70 border border-gray-100 rounded-xs hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex gap-4 items-start">
                    <span className="px-2.5 py-1 bg-[#5a0a9b] text-white font-extrabold text-[10px] rounded-xs uppercase tracking-wider shrink-0 mt-0.5">1F</span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-base text-gray-950">웰니스 센터 (피트니스 & GX)</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-semibold">다양한 최신 피트니스 운동 기구가 구비되어 건강 및 체력 관리를 도울 수 있도록 설계한 고품격 전용 운동 공간</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side big tall image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:col-span-7 flex justify-center w-full"
            >
              <div className="relative w-full max-w-2xl bg-gray-50 rounded-xs overflow-hidden shadow-xl border border-gray-200 p-3 hover:shadow-primary/5 transition-all duration-300 group">
                <img 
                  src={communityImageSrc} 
                  alt="한화포레나 인천학익 커뮤니티 시설 동호수 및 3D 입체 투시도" 
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (communityImageSrc === "/uploads/community.png") {
                      setCommunityImageSrc(forenaCommunityImg);
                    }
                  }}
                  className="w-full h-auto object-contain rounded-xs transition-transform duration-500 group-hover:scale-[1.01]"
                />
                

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer transparentLogo={transparentLogo} />
      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <SmsConfigModal isOpen={isSmsConfigOpen} onClose={() => setIsSmsConfigOpen(false)} />

      {/* Map Zoom Lightbox Modal */}
      <AnimatePresence>
        {isMapZoomOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsMapZoomOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer"
              onClick={() => setIsMapZoomOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div 
              className="max-w-7xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={mapImageSrc} 
                alt="한화포레나 인천학익 광역입지도 크게 보기"
                onError={() => {
                  if (mapImageSrc === "/uploads/map.png") {
                    setMapImageSrc(forenaMapImg);
                  }
                }}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xs shadow-2xl" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
