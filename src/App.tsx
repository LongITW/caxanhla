import React, { useState, useMemo, useRef } from 'react'
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Chip,
  Avatar,
  TextField,
  Stack,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Tooltip,
  InputAdornment,
  alpha,
} from '@mui/material'
import {
  DarkModeRounded,
  LightModeRounded,
  GitHub,
  LinkedIn,
  EmailRounded,
  LaunchRounded,
  SendRounded,
  MenuRounded,
  CloseRounded,
  ArrowDownwardRounded,
  SportsBarRounded,
  LocalFireDepartmentRounded,
  EmojiEventsRounded,
  RestaurantMenuRounded,
  ReceiptLongRounded,
  BoltRounded,
  VisibilityRounded,
  VisibilityOffRounded,
  CodeRounded,
  BrushRounded,
  StorageRounded,
  DownloadRounded,
  TerminalRounded,
  WorkRounded,
} from '@mui/icons-material'
import { motion, type Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import avatarImg from './assets/Image.jpeg'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { CustomCursor } from './components/CustomCursor'
import { Reveal } from './components/Reveal'
import { TiltCard } from './components/TiltCard'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ============================================================================
// 0. CẤU HÌNH MẬT KHẨU (.env -> VITE_SECRET_PASSWORD)
// ============================================================================
const SECRET_PASSWORD = import.meta.env.VITE_SECRET_PASSWORD || 'HDBank@2026!'
const SESSION_UNLOCK_KEY = 'caxanhla_secret_unlocked'
const SESSION_TAB_KEY = 'caxanhla_active_tab'

// ============================================================================
// 1A. DỮ LIỆU PUBLIC: HỒ SƠ ĐÔ NHẬU HÀI HƯỚC
// ============================================================================
const PERSONAL_INFO = {
  name: 'Nguyễn Khánh Long',
  brand: 'Caxanhla',
  role: 'Senior Nhậu Thủ • Kiến Trúc Sư Bàn Nhậu (Full-Tăng Developer)',
  tagline: 'Uống có trách nhiệm — Trách nhiệm là không để anh em nào tỉnh táo đi về.',
  bio: 'Với hơn 5 năm kinh nghiệm thực chiến tại các mặt trận từ Vỉa Hè, Quán Ốc cho tới Beer Club, tôi chuyên sâu về hệ sinh thái Bia Lạnh, Rượu Ngâm và Mồi Bén. Sở hữu kiến trúc bao tử mở rộng (Scalable Stomach), khả năng chịu tải cồn cao (High Availability) và cam kết không bao giờ tự ý "ngắt kết nối" trước Tăng 3.',
  avatar: avatarImg,
  email: 'longnkitwork@gmail.com',
  github: 'https://github.com/LongITW',
  linkedin: 'https://www.linkedin.com/',
  cvUrl: '#contact',
}

const DRINKING_STATS = [
  { label: '🍺 Đô Bia Tiêu Chuẩn', value: '1 Kết + 2 lon tình cảm' },
  { label: '🥃 Đô Rượu Ngâm', value: '1.5 Lít (Chưa tính trà đá)' },
  { label: '⚡ Ping Lên Kèo', value: '< 5 phút có mặt tại quán' },
  { label: '🛡️ Tỷ Lệ Rớt Đài', value: '0.01% (Trừ lúc tính tiền)' },
]

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Hệ Sinh Thái Cồn (Core Đô)',
    icon: <SportsBarRounded color="primary" />,
    skills: [
      'Tiger Bạc / Heineken (Senior)',
      'Bia Thủ Công (Craft Beer)',
      'Rượu Chuối Hột / Ba Kích',
      'Soju Pha Yakult Tỷ Lệ Vàng',
      'Vodka / Whisky (Full-stack)',
      'Uống Giao Lưu 100% Không Long Đền',
    ],
  },
  {
    title: 'Kỹ Năng Bàn Nhậu & Mồi Bén',
    icon: <RestaurantMenuRounded color="secondary" />,
    skills: [
      'Gắp Mồi Tốc Độ Cao (Low Latency)',
      'Chém Gió Đa Luồng (Multi-threading)',
      'Bắt Nhịp "1, 2, 3 Dô!" Chuẩn Beat',
      'Giữ Ly Không Tràn (Zero Memory Leak)',
      'Nướng Thịt Không Cháy',
      'Gọi Thêm Đá & Khăn Lạnh Đúng Lúc',
    ],
  },
  {
    title: 'Chiến Thuật Sinh Tồn & Hậu Cần',
    icon: <EmojiEventsRounded color="info" />,
    skills: [
      'Giả Bộ Nghe Điện Thoại Lúc Tính Tiền',
      'Đặt Grab Về Đúng Nhà (Auto-Routing)',
      'Trụ Vững Tới Tăng 3 Karaoke',
      'Giải Rượu Tự Động Sáng Hôm Sau',
      'Xin Visa Vợ/Người Yêu Hợp Lệ',
      'Dìu Đồng Đội Về Tận Giường',
    ],
  },
]

interface ProjectItem {
  title: string
  description: string
  image: string
  techStack: string[]
  billSummary: string
  logs: string[]
}

const PROJECTS: ProjectItem[] = [
  {
    title: 'Chiến Dịch "Ra Làm 2 Chai Thôi" (Scale-up 2 Thùng)',
    description:
      'Khởi động lúc 18h00 với lời hứa kinh điển "ra làm 2 chai nói chuyện công việc rồi về ngủ sớm", nhưng hệ thống tự động auto-scale lên 2 thùng Tiger Bạc và kết thúc ở quán cháo lòng lúc 4h30 sáng.',
    image: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800&auto=format&fit=crop&q=80',
    techStack: ['2 Thùng Tiger Bạc', 'Chân Gà Nướng Mật Ong', 'Cháo Lòng 4h Sáng', 'Uptime 100%'],
    billSummary: 'Tổng thiệt hại: 48 lon Tiger Bạc, 4 dĩa chân gà, 1 nồi lẩu cá kèo, 4 tô cháo lòng full topping.',
    logs: [
      '[18:00] Khởi tạo kèo: "Nay mệt lắm, ra làm đúng 2 lon rồi về nha anh em."',
      '[19:15] Phát hiện câu nói dối kinh điển -> Tự động gọi thêm 1 thùng 24 lon.',
      '[21:30] Mở rộng băng thông bàn nhậu: Bắt đầu bàn chuyện vũ trụ, kinh tế vĩ mô và bất động sản.',
      '[01:20] Cảnh báo: Có 1 đồng đội đi WC 25 phút chưa vào lúc nhân viên cầm bill ra.',
      '[04:30] Deploy thành công tại quán cháo lòng, bảo toàn 100% quân số về nhà.',
    ],
  },
  {
    title: 'Hệ Thống Lẩu Dê & Rượu Ngọc Dương (Stress Test)',
    description:
      'Bài kiểm tra sức chịu tải cực đại của bao tử trong điều kiện mưa ngập Sài Gòn. Xử lý mượt mà 3 bình rượu ngâm liên tiếp với độ trễ gắp thịt dê dưới 10ms, giữ vững tinh thần để đi hát Karaoke.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    techStack: ['3 Bình Rượu Ngâm', 'Lẩu Dê Khô', 'Dê Tái Chanh', 'Zero Huệ'],
    billSummary: 'Tổng thiệt hại: 3 bình rượu ngọc dương + chuối hột, 2 phần vú dê nướng, 1 nồi lẩu dê đại, 12 khăn lạnh.',
    logs: [
      '[18:30] Trời mưa lâm râm -> Kích hoạt giao thức Lẩu Dê khẩn cấp.',
      '[19:45] Tốc độ gắp vú dê nướng đạt đỉnh 120 miếng/phút (Low Latency).',
      '[21:00] Chuyển đổi nhiên liệu từ Bia sang Rượu Chuối Hột không cần thời gian downtime.',
      '[23:15] Hệ thống bao tử vẫn hoạt động ổn định ở mức tải 92%, không phát sinh lỗi "gọi tên Huệ".',
    ],
  },
  {
    title: 'Kiến Trúc Đa Tăng: Quán Ốc ➔ Beer Club ➔ Karaoke',
    description:
      'Tối ưu hóa luồng di chuyển liên hoàn 3 tăng trong 1 đêm không nghỉ. Tích hợp thuật toán tự động giành mic bài "Nối Vòng Tay Lớn" và cơ chế né uống phạt khi tới trễ 30 phút.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80',
    techStack: ['Ốc Hương Xào Bơ', 'Tháp Bia Tươi 3L', 'Full Mic Karaoke', 'Né Phạt 3 Ly'],
    billSummary: 'Tổng thiệt hại: 6 dĩa ốc các loại, 3 tháp bia tươi, 2 tiếng Karaoke VIP, 1 dĩa trái cây (không ai ăn).',
    logs: [
      '[19:00] Tăng 1 (Quán Ốc): Khởi động nhẹ nhàng lót dạ chống say.',
      '[21:00] Tăng 2 (Beer Club): Âm lượng vượt ngưỡng, chuyển sang giao tiếp bằng ngôn ngữ hình thể và cụng ly.',
      '[23:30] Tăng 3 (Karaoke): Độc chiếm micro 85% thời lượng, hát lệch tông nhưng cực kỳ cảm xúc.',
      '[02:00] Hoàn tất chuỗi CI/CD (Cụng In / Cạn Đi), gọi GrabCar đưa từng ông về.',
    ],
  },
  {
    title: 'Giải Cứu Đồng Đội Thất Tình (Hotfix Khẩn Cấp 2h Sáng)',
    description:
      'Triển khai cứu hộ lúc nửa đêm khi thằng bạn thân vừa bị người yêu chia tay. Chịu đựng vòng lặp tâm sự vô tận (Infinite Loop) suốt 4 tiếng đồng hồ và dìu đồng đội về tận phòng.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&auto=format&fit=crop&q=80',
    techStack: ['Bia Đen Đức', 'Khô Mực Nướng Cồn', 'Chịu Đựng Infinite Loop', 'Cứu Hộ 24/7'],
    billSummary: 'Tổng thiệt hại: 18 lon bia đen, 2 con khô mực nướng, 1 hộp khăn giấy lau nước mắt cho thằng bạn.',
    logs: [
      '[01:45] Nhận cảnh báo P0: "Mày ơi tao chia tay rồi, ra quán đầu hẻm liền đi."',
      '[01:50] Có mặt tại hiện trường trong 5 phút (vẫn mặc quần đùi áo ba lỗ).',
      '[02:30] Lắng nghe câu "Tao không hiểu sao cổ làm vậy" lặp lại lần thứ 42 (Infinite Loop).',
      '[05:00] Đồng đội đã ngủ gục trên bàn -> Thanh toán bill và vác về tận giường.',
    ],
  },
]

// ============================================================================
// 1B. DỮ LIỆU PRIVATE (TAB MẬT KHẨU): CV SENIOR FRONTEND DEVELOPER THẬT
// ============================================================================
const REAL_CV_INFO = {
  name: 'Nguyễn Khánh Long',
  brand: 'Caxanhla',
  role: 'Senior Frontend Developer',
  tagline: 'Xây dựng trải nghiệm web tốc độ cao, tinh tế và lấy người dùng làm trung tâm.',
  bio: 'Tôi là một lập trình viên Frontend với hơn 3 năm kinh nghiệm chuyên sâu về hệ sinh thái React, Next.js và TypeScript. Đam mê kiến trúc giao diện mở rộng (Scalable UI), tối ưu hiệu năng và tạo ra những hiệu ứng tương tác mượt mà với GSAP & Framer Motion.',
  highlights: [
    { label: '💼 Kinh nghiệm', value: '3+ Năm Frontend chuyên sâu' },
    { label: '⚛️ Tech Stack chính', value: 'React, Next.js, TypeScript' },
    { label: '✨ UI & Motion', value: 'MUI, Tailwind, GSAP, Lenis' },
    { label: '🚀 Hiệu năng', value: 'Lighthouse 95-100 / Web Vitals' },
  ],
}

const REAL_SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Core',
    icon: <CodeRounded color="primary" />,
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Redux Toolkit / Zustand'],
  },
  {
    title: 'UI & Animation',
    icon: <BrushRounded color="secondary" />,
    skills: ['Material UI (MUI)', 'Tailwind CSS', 'GSAP / ScrollTrigger', 'Framer Motion', 'Lenis Smooth Scroll', 'Figma'],
  },
  {
    title: 'Backend & Công cụ',
    icon: <StorageRounded color="info" />,
    skills: ['Node.js', 'RESTful APIs', 'GraphQL', 'Git / GitHub', 'Vite', 'Docker / CI-CD'],
  },
]

interface RealProjectItem {
  title: string
  description: string
  image: string
  techStack: string[]
  githubUrl: string
  demoUrl: string
}

const REAL_PROJECTS: RealProjectItem[] = [
  {
    title: 'SaaS Analytics Dashboard',
    description:
      'Nền tảng quản trị và phân tích dữ liệu thời gian thực cho doanh nghiệp E-commerce với biểu đồ tương tác trực quan, phân quyền RBAC và chế độ Dark Mode.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    techStack: ['Next.js', 'TypeScript', 'Material UI', 'Recharts'],
    githubUrl: 'https://github.com/LongITW',
    demoUrl: 'https://github.com/LongITW',
  },
  {
    title: 'TaskFlow - Quản lý Dự án Agile',
    description:
      'Ứng dụng Kanban board hỗ trợ kéo thả mượt mà, cộng tác nhóm theo thời gian thực thông qua WebSockets và hệ thống thông báo thông minh.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=80',
    techStack: ['React', 'TypeScript', 'GSAP', 'Socket.io'],
    githubUrl: 'https://github.com/LongITW',
    demoUrl: 'https://github.com/LongITW',
  },
  {
    title: 'AI Code Assistant Platform',
    description:
      'Giao diện web hiện đại tích hợp trợ lý AI cho lập trình viên, tối ưu điểm hiệu năng Lighthouse 100/100 cùng trải nghiệm streaming response mượt mà.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    techStack: ['React', 'MUI', 'Lenis', 'Vite'],
    githubUrl: 'https://github.com/LongITW',
    demoUrl: 'https://github.com/LongITW',
  },
  {
    title: 'FinTrack - Quản lý Tài chính Cá nhân',
    description:
      'Ứng dụng theo dõi chi tiêu và lập ngân sách thông minh, hỗ trợ xuất báo cáo tự động và đồng bộ hóa đa thiết bị.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    techStack: ['Next.js', 'TypeScript', 'MUI', 'Chart.js'],
    githubUrl: 'https://github.com/LongITW',
    demoUrl: 'https://github.com/LongITW',
  },
]

const PUBLIC_NAV_ITEMS = [
  { label: 'Hồ sơ nhậu', href: '#about' },
  { label: 'Chỉ số & Đô', href: '#skills' },
  { label: 'Chiến tích', href: '#projects' },
  { label: 'Lên kèo ngay', href: '#contact' },
]

const REAL_NAV_ITEMS = [
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Dự án', href: '#projects' },
  { label: 'Liên hệ', href: '#contact' },
]

// ============================================================================
// 2. HIỆU ỨNG FRAMER MOTION
// ============================================================================
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
}

// ============================================================================
// 3. CÁC COMPONENTS GIAO DIỆN
// ============================================================================

interface NavbarProps {
  mode: 'dark' | 'light'
  toggleMode: () => void
  onOpenSimulator: () => void
  isUnlocked: boolean
  activeTab: 'drinking' | 'real_cv'
  onSecretIconClick: () => void
  onToggleTab: (tab: 'drinking' | 'real_cv') => void
  onLockSecret: () => void
}

const Navbar: React.FC<NavbarProps> = ({
  mode,
  toggleMode,
  onOpenSimulator,
  isUnlocked,
  activeTab,
  onSecretIconClick,
  onToggleTab,
  onLockSecret,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  const navItems = activeTab === 'real_cv' ? REAL_NAV_ITEMS : PUBLIC_NAV_ITEMS

  useGSAP(() => {
    const bar = barRef.current
    if (!bar) return
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      },
    )
  })

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: 'blur(14px)',
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.82),
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        ref={barRef}
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 2,
          width: '100%',
          bgcolor: 'primary.main',
          transformOrigin: 'left center',
        }}
      />
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            component="a"
            href="#"
            sx={{ textDecoration: 'none', color: 'text.primary' }}
          >
            {activeTab === 'real_cv' ? (
              <TerminalRounded color="primary" fontSize="large" />
            ) : (
              <SportsBarRounded color="primary" fontSize="large" />
            )}
            <Typography variant="h6" fontWeight={800} letterSpacing="-0.5px">
              {PERSONAL_INFO.brand}
              <Box component="span" sx={{ color: 'primary.main' }}>
                {activeTab === 'real_cv' ? '.dev' : '.nhậu'}
              </Box>
            </Typography>
          </Stack>

          {/* Menu trên Desktop */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                href={item.href}
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  px: 1.75,
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                }}
              >
                {item.label}
              </Button>
            ))}

            {activeTab === 'drinking' && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<BoltRounded />}
                onClick={onOpenSimulator}
                sx={{ borderRadius: 2, fontWeight: 700, ml: 0.5 }}
              >
                Test Đô Online
              </Button>
            )}

            {/* Nếu đã mở khóa: hiển thị nút chuyển qua lại giữa 2 bàn */}
            {isUnlocked && (
              <Chip
                icon={activeTab === 'real_cv' ? <SportsBarRounded fontSize="small" /> : <WorkRounded fontSize="small" />}
                label={activeTab === 'real_cv' ? 'Về lại Bàn Nhậu' : 'Qua Bàn Trong'}
                color="primary"
                variant={activeTab === 'real_cv' ? 'filled' : 'outlined'}
                onClick={() => onToggleTab(activeTab === 'real_cv' ? 'drinking' : 'real_cv')}
                sx={{ fontWeight: 700, cursor: 'pointer', ml: 0.5 }}
              />
            )}

            {/* Icon Ly Bia 🍺 ngay kế bên nút Dark/Light */}
            <Tooltip
              title={
                isUnlocked
                  ? 'Đóng cửa bàn trong (Khóa lại)'
                  : 'Trạm kiểm tra nồng độ cồn 🍺'
              }
            >
              <IconButton
                onClick={isUnlocked ? onLockSecret : onSecretIconClick}
                color={isUnlocked ? 'primary' : 'inherit'}
                aria-label="Trạm kiểm tra nồng độ cồn"
                sx={{
                  ml: 1,
                  width: 36,
                  height: 36,
                  border: '1px solid',
                  borderColor: isUnlocked ? 'primary.main' : 'divider',
                  bgcolor: (theme) => (isUnlocked ? alpha(theme.palette.primary.main, 0.14) : 'transparent'),
                  transition: 'all 0.2s ease',
                  '&:hover': { transform: 'scale(1.1) rotate(-8deg)', borderColor: 'primary.main' },
                }}
              >
                <Box component="span" sx={{ fontSize: '1.1rem', lineHeight: 1 }}>
                  🍺
                </Box>
              </IconButton>
            </Tooltip>

            {/* Nút Dark / Light Mode */}
            <Tooltip title={mode === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}>
              <IconButton
                onClick={toggleMode}
                color="inherit"
                aria-label="Chuyển đổi giao diện sáng/tối"
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'rotate(15deg)', borderColor: 'primary.main' },
                }}
              >
                {mode === 'dark' ? <LightModeRounded fontSize="small" /> : <DarkModeRounded fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Nút điều khiển trên Mobile */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              onClick={isUnlocked ? onLockSecret : onSecretIconClick}
              color={isUnlocked ? 'primary' : 'inherit'}
              aria-label="Trạm kiểm tra nồng độ cồn"
              sx={{
                width: 36,
                height: 36,
                border: '1px solid',
                borderColor: isUnlocked ? 'primary.main' : 'divider',
              }}
            >
              <Box component="span" sx={{ fontSize: '1.1rem', lineHeight: 1 }}>
                🍺
              </Box>
            </IconButton>
            <IconButton onClick={toggleMode} color="inherit" aria-label="Chuyển đổi giao diện sáng/tối">
              {mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
            </IconButton>
            <IconButton onClick={() => setMobileOpen(true)} color="inherit" aria-label="Mở menu">
              <MenuRounded />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Drawer trên Mobile */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1, px: 1 }}>
            <Typography fontWeight={800} color="primary">
              {PERSONAL_INFO.brand}
              {activeTab === 'real_cv' ? '.dev' : '.nhậu'}
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseRounded />
            </IconButton>
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component="a" href={item.href} onClick={() => setMobileOpen(false)}>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}

            {isUnlocked && (
              <ListItem disablePadding sx={{ mt: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={activeTab === 'real_cv' ? <SportsBarRounded /> : <WorkRounded />}
                  onClick={() => {
                    setMobileOpen(false)
                    onToggleTab(activeTab === 'real_cv' ? 'drinking' : 'real_cv')
                  }}
                >
                  {activeTab === 'real_cv' ? 'Về lại Bàn Nhậu' : 'Qua Bàn Trong'}
                </Button>
              </ListItem>
            )}

            <ListItem disablePadding sx={{ mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SportsBarRounded />}
                onClick={() => {
                  setMobileOpen(false)
                  if (isUnlocked) {
                    onLockSecret()
                  } else {
                    onSecretIconClick()
                  }
                }}
              >
                {isUnlocked ? 'Đóng Cửa Bàn Trong' : 'Nhập Pass Đồng Nhậu 🍺'}
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

interface HeroSectionProps {
  onOpenSimulator: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSimulator }) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const avatarWrapRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const st = { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(avatarWrapRef.current, { yPercent: 16, ease: 'none', scrollTrigger: st })
      gsap.to(titleRef.current, { yPercent: -42, ease: 'none', scrollTrigger: st })
      gsap.to(heroRef.current, {
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { ...st, start: '60% top' },
      })
    },
    { scope: heroRef },
  )

  return (
    <Box id="about" ref={heroRef} sx={{ pt: { xs: 7, md: 11 }, pb: { xs: 9, md: 14 }, position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '6.5fr 5.5fr' },
            gap: { xs: 6, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Cột nội dung giới thiệu */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Chip
                label="🍻 Trạng thái: Đang khát nước • Sẵn sàng nổ địa chỉ 24/7"
                color="primary"
                variant="outlined"
                size="small"
                sx={{ mb: 2.5, fontWeight: 600, borderRadius: 2, px: 0.75 }}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.35rem', sm: '3.1rem', md: '3.5rem' },
                  lineHeight: 1.15,
                  letterSpacing: '-1px',
                  mb: 2,
                }}
              >
                Xin chào, tôi là{' '}
                <Box
                  component="span"
                  ref={titleRef}
                  sx={{
                    display: 'inline-block',
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(90deg, #F59E0B 0%, #FDE68A 50%, #E2E8F0 100%)'
                        : 'linear-gradient(90deg, #B45309 0%, #D97706 55%, #475569 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {PERSONAL_INFO.name}
                </Box>
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="h5" color="text.secondary" fontWeight={600} sx={{ mb: 2 }}>
                {PERSONAL_INFO.role}
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, lineHeight: 1.8 }}>
                {PERSONAL_INFO.bio}
              </Typography>
            </motion.div>

            {/* Bảng thông số Đô Nhậu nhanh */}
            <motion.div variants={fadeInUp}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 1.5,
                  mb: 4,
                  maxWidth: 600,
                }}
              >
                {DRINKING_STATS.map((stat) => (
                  <Box
                    key={stat.label}
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                      {stat.label}
                    </Typography>
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      {stat.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>

            {/* 2 nút CTA */}
            <motion.div variants={fadeInUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  variant="contained"
                  size="large"
                  onClick={onOpenSimulator}
                  endIcon={<SportsBarRounded />}
                  sx={{
                    py: 1.5,
                    px: 3.5,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    boxShadow: (theme) => `0 10px 25px -5px ${alpha(theme.palette.primary.main, 0.45)}`,
                  }}
                >
                  Live Demo Test Đô
                </Button>

                <Button
                  component={motion.a}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  variant="outlined"
                  size="large"
                  href={PERSONAL_INFO.cvUrl}
                  startIcon={<LocalFireDepartmentRounded />}
                  sx={{ py: 1.5, px: 3.5, borderRadius: 2.5, fontWeight: 600 }}
                >
                  Đặt lịch lên kèo
                </Button>
              </Stack>
            </motion.div>
          </motion.div>

          {/* Cột Avatar */}
          <Box ref={avatarWrapRef} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    width: { xs: 300, sm: 360, md: 420 },
                    height: { xs: 300, sm: 360, md: 420 },
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.42), rgba(226, 232, 240, 0.28))',
                    filter: 'blur(42px)',
                    zIndex: 0,
                  }}
                />
                <Avatar
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  slotProps={{
                    img: { style: { objectFit: 'contain', transform: 'scale(1.12) translateY(4%)' } },
                  }}
                  sx={{
                    width: { xs: 280, sm: 340, md: 380 },
                    height: { xs: 280, sm: 340, md: 380 },
                    bgcolor: '#ffffff',
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: (theme) => `0 20px 45px -12px ${alpha(theme.palette.primary.main, 0.4)}`,
                    zIndex: 1,
                  }}
                />
              </Box>
            </motion.div>
          </Box>
        </Box>

        {/* Gợi ý cuộn */}
        <Stack alignItems="center" sx={{ mt: { xs: 6, md: 9 } }}>
          <ArrowDownwardRounded
            sx={{
              color: 'text.secondary',
              animation: 'bounceDown 2s ease-in-out infinite',
              '@keyframes bounceDown': {
                '0%, 100%': { transform: 'translateY(0)', opacity: 0.5 },
                '50%': { transform: 'translateY(10px)', opacity: 1 },
              },
            }}
          />
        </Stack>
      </Container>
    </Box>
  )
}

const SkillsSection: React.FC = () => {
  return (
    <Box id="skills" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Reveal>
          <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5} display="block" textAlign="center">
            THÔNG SỐ KỸ THUẬT BAO TỬ
          </Typography>
          <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
            Bản Đồ Đô Nhậu &amp; Kỹ Năng Thực Chiến
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 660, mx: 'auto', mb: 6, lineHeight: 1.75 }}
          >
            &ldquo;{PERSONAL_INFO.tagline}&rdquo; — Dưới đây là các hệ cồn, kỹ năng gắp mồi và tuyệt chiêu sinh tồn được tôi rèn luyện qua hàng trăm cuộc vui.
          </Typography>
        </Reveal>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3.5 }}>
          {SKILL_CATEGORIES.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.12}>
              <TiltCard max={10} scale={1.02}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 1,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: (theme) => `0 14px 30px -10px ${alpha(theme.palette.primary.main, 0.25)}`,
                    },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          p: 1.2,
                          borderRadius: 2.5,
                          display: 'flex',
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography variant="h6" fontWeight={700}>
                        {category.title}
                      </Typography>
                    </Stack>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {category.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          variant="outlined"
                          sx={{
                            fontWeight: 500,
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: 'primary.contrastText',
                              borderColor: 'primary.main',
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </TiltCard>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void
  onOpenSimulator: () => void
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject, onOpenSimulator }) => {
  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Reveal>
          <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5} display="block" textAlign="center">
            LỊCH SỬ CHIẾN TRƯỜNG
          </Typography>
          <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
            Các Kèo Nhậu Tiêu Biểu (Đã Deploy)
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 650, mx: 'auto', mb: 6, lineHeight: 1.75 }}
          >
            Những dự án thực tế được đầu tư kỹ lưỡng về lượng cồn tiêu thụ, tốc độ gắp mồi và khả năng bảo toàn tính mạng cho đồng đội tới tận sáng.
          </Typography>
        </Reveal>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 4 }}>
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} from={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 0.1}>
              <TiltCard max={9} scale={1.02}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: (theme) => `0 20px 35px -10px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                  }}
                >
                  <CardMedia component="img" height="220" image={project.image} alt={project.title} sx={{ objectFit: 'cover' }} />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {project.techStack.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                            color: 'primary.main',
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ px: 3, pb: 3, pt: 0, gap: 1 }}>
                    <Button
                      component={motion.button}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      size="small"
                      startIcon={<ReceiptLongRounded />}
                      onClick={() => onSelectProject(project)}
                      sx={{ fontWeight: 600 }}
                    >
                      Xem Sao Kê / Log
                    </Button>
                    <Button
                      component={motion.button}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      size="small"
                      variant="contained"
                      endIcon={<LaunchRounded />}
                      onClick={onOpenSimulator}
                      sx={{ fontWeight: 600, borderRadius: 2, ml: 'auto' }}
                    >
                      Live Demo Đô
                    </Button>
                  </CardActions>
                </Card>
              </TiltCard>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

const ContactSection: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpenSnackbar(true)
    e.currentTarget.reset()
  }

  return (
    <Box id="contact" sx={{ pt: { xs: 8, md: 12 }, pb: 6, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: { xs: 5, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Thông tin liên hệ */}
          <Reveal from="left">
            <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5}>
              BOOKING BÀN NHẬU 24/7
            </Typography>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Lên Kèo &amp; Kiểm Chứng Đô
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
              Bạn nghi ngờ các thông số đô nhậu phía trên là &ldquo;chém gió&rdquo;? Đừng nhìn CV, hãy nhìn cách tôi cầm ly! Gửi ngay tọa độ quán để nhận bản Demo người thật việc thật trong vòng 15 phút (Ưu tiên duyệt kèo miễn phí cho chủ xị bao trọn gói).
            </Typography>

            <Stack spacing={2.5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton href={`mailto:${PERSONAL_INFO.email}`} color="primary" sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12) }}>
                  <EmailRounded />
                </IconButton>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Tổng đài nhận kèo khẩn cấp
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {PERSONAL_INFO.email}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                <Button
                  component={motion.a}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  variant="outlined"
                  startIcon={<GitHub />}
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                  GitHub (Lúc tỉnh)
                </Button>
                <Button
                  component={motion.a}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  variant="outlined"
                  startIcon={<LinkedIn />}
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                  LinkedIn
                </Button>
              </Stack>
            </Stack>
          </Reveal>

          {/* Form liên hệ */}
          <Reveal from="right" delay={0.15}>
            <Card component="form" onSubmit={handleSubmit} elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
              <Stack spacing={2.5}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <TextField fullWidth required label="Tên đồng nhậu / Chủ xị" variant="outlined" />
                  <TextField fullWidth required label="SĐT / Zalo nổ vị trí" variant="outlined" />
                </Box>
                <TextField fullWidth required label="Cấu hình kèo (VD: Sương sương 5 chai / Tới bến)" variant="outlined" />
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Tên quán, địa chỉ, mồi chủ lực & nhớ ghi rõ AI TRẢ TIỀN..."
                  variant="outlined"
                />
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendRounded />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    boxShadow: (theme) => `0 10px 25px -5px ${alpha(theme.palette.primary.main, 0.45)}`,
                  }}
                >
                  Nổ Địa Chỉ • Chốt Kèo Ngay 🍻
                </Button>
              </Stack>
            </Card>
          </Reveal>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Footer */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {PERSONAL_INFO.name} ({PERSONAL_INFO.brand}). Đã kiểm định đô nhậu chuẩn ISO-100%-Cồn.
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" href={PERSONAL_INFO.github} target="_blank" color="inherit" aria-label="GitHub">
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton size="small" href={PERSONAL_INFO.linkedin} target="_blank" color="inherit" aria-label="LinkedIn">
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton size="small" href={`mailto:${PERSONAL_INFO.email}`} color="inherit" aria-label="Email">
              <EmailRounded fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={4500} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" variant="filled" sx={{ width: '100%', fontWeight: 600 }}>
          🍻 Đã nhận kèo! Tôi đang xin phép ở nhà và bắt Grab ra quán liền, nhớ kêu sẵn đá với mồi nha!
        </Alert>
      </Snackbar>
    </Box>
  )
}

// ============================================================================
// 3B. GIAO DIỆN TAB BÍ MẬT: CV SENIOR FRONTEND DEVELOPER NGHIÊM TÚC
// ============================================================================
interface RealPortfolioViewProps {
  onLockSecret: () => void
  onSwitchToDrinking: () => void
}

const RealPortfolioView: React.FC<RealPortfolioViewProps> = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpenSnackbar(true)
    e.currentTarget.reset()
  }

  return (
    <Box>
      {/* Hero CV */}
      <Box id="about" sx={{ pt: { xs: 7, md: 11 }, pb: { xs: 9, md: 14 }, position: 'relative', overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '6.5fr 5.5fr' },
              gap: { xs: 6, md: 6 },
              alignItems: 'center',
            }}
          >
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp}>
                <Chip
                  label="🚀 Sẵn sàng cho các dự án & cơ hội hợp tác mới"
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2.5, fontWeight: 600, borderRadius: 2, px: 0.75 }}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.35rem', sm: '3.1rem', md: '3.5rem' },
                    lineHeight: 1.15,
                    letterSpacing: '-1px',
                    mb: 2,
                  }}
                >
                  Xin chào, tôi là{' '}
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(90deg, #F59E0B 0%, #FDE68A 50%, #E2E8F0 100%)'
                          : 'linear-gradient(90deg, #B45309 0%, #D97706 55%, #475569 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {REAL_CV_INFO.name}
                  </Box>
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography variant="h5" color="text.secondary" fontWeight={600} sx={{ mb: 2 }}>
                  {REAL_CV_INFO.role}
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, lineHeight: 1.8 }}>
                  {REAL_CV_INFO.bio}
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 1.5,
                    mb: 4,
                    maxWidth: 600,
                  }}
                >
                  {REAL_CV_INFO.highlights.map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                        {item.label}
                      </Typography>
                      <Typography variant="body2" fontWeight={700} color="primary.main">
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    component={motion.a}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    variant="contained"
                    size="large"
                    href="#projects"
                    endIcon={<LaunchRounded />}
                    sx={{
                      py: 1.5,
                      px: 3.5,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      boxShadow: (theme) => `0 10px 25px -5px ${alpha(theme.palette.primary.main, 0.45)}`,
                    }}
                  >
                    Xem dự án thực tế
                  </Button>

                  <Button
                    component={motion.a}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    variant="outlined"
                    size="large"
                    href="#contact"
                    startIcon={<DownloadRounded />}
                    sx={{ py: 1.5, px: 3.5, borderRadius: 2.5, fontWeight: 600 }}
                  >
                    Tải CV / Liên hệ
                  </Button>
                </Stack>
              </motion.div>
            </motion.div>

            {/* Cột Avatar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  width: { xs: 300, sm: 360, md: 420 },
                  height: { xs: 300, sm: 360, md: 420 },
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.42), rgba(226, 232, 240, 0.28))',
                  filter: 'blur(42px)',
                  zIndex: 0,
                }}
              />
              <Avatar
                src={PERSONAL_INFO.avatar}
                alt={REAL_CV_INFO.name}
                slotProps={{
                  img: { style: { objectFit: 'contain', transform: 'scale(1.12) translateY(4%)' } },
                }}
                sx={{
                  width: { xs: 280, sm: 340, md: 380 },
                  height: { xs: 280, sm: 340, md: 380 },
                  bgcolor: '#ffffff',
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: (theme) => `0 20px 45px -12px ${alpha(theme.palette.primary.main, 0.4)}`,
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Kỹ năng chuyên môn */}
      <Box id="skills" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Reveal>
            <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5} display="block" textAlign="center">
              NĂNG LỰC CỐT LÕI
            </Typography>
            <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
              Kỹ Năng &amp; Công Nghệ Chuyên Môn
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ maxWidth: 640, mx: 'auto', mb: 6, lineHeight: 1.75 }}
            >
              {REAL_CV_INFO.tagline} Dưới đây là các công nghệ và công cụ tôi sử dụng hàng ngày để kiến tạo sản phẩm.
            </Typography>
          </Reveal>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3.5 }}>
            {REAL_SKILL_CATEGORIES.map((category, i) => (
              <Reveal key={category.title} delay={i * 0.12}>
                <TiltCard max={10} scale={1.02}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      p: 1,
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: (theme) => `0 14px 30px -10px ${alpha(theme.palette.primary.main, 0.25)}`,
                      },
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                        <Box
                          sx={{
                            p: 1.2,
                            borderRadius: 2.5,
                            display: 'flex',
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                          }}
                        >
                          {category.icon}
                        </Box>
                        <Typography variant="h6" fontWeight={700}>
                          {category.title}
                        </Typography>
                      </Stack>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {category.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            variant="outlined"
                            sx={{
                              fontWeight: 500,
                              borderRadius: 2,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                borderColor: 'primary.main',
                                transform: 'scale(1.05)',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Dự án tiêu biểu */}
      <Box id="projects" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5} display="block" textAlign="center">
              PORTFOLIO
            </Typography>
            <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
              Dự Án Phần Mềm Tiêu Biểu
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ maxWidth: 640, mx: 'auto', mb: 6, lineHeight: 1.75 }}
            >
              Các dự án thực tế được đầu tư kỹ lưỡng về kiến trúc code, hiệu năng xử lý và trải nghiệm tương tác người dùng.
            </Typography>
          </Reveal>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 4 }}>
            {REAL_PROJECTS.map((project, i) => (
              <Reveal key={project.title} from={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 0.1}>
                <TiltCard max={9} scale={1.02}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: (theme) => `0 20px 35px -10px ${alpha(theme.palette.primary.main, 0.3)}`,
                      },
                    }}
                  >
                    <CardMedia component="img" height="220" image={project.image} alt={project.title} sx={{ objectFit: 'cover' }} />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                        {project.techStack.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                              color: 'primary.main',
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ px: 3, pb: 3, pt: 0, gap: 1 }}>
                      <Button
                        component={motion.a}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        size="small"
                        startIcon={<GitHub />}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ fontWeight: 600 }}
                      >
                        GitHub
                      </Button>
                      <Button
                        component={motion.a}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        size="small"
                        variant="contained"
                        endIcon={<LaunchRounded />}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ fontWeight: 600, borderRadius: 2, ml: 'auto' }}
                      >
                        Live Demo
                      </Button>
                    </CardActions>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Liên hệ công việc */}
      <Box id="contact" sx={{ pt: { xs: 8, md: 12 }, pb: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
              gap: { xs: 5, md: 6 },
              alignItems: 'center',
            }}
          >
            <Reveal from="left">
              <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5}>
                LIÊN HỆ CÔNG VIỆC
              </Typography>
              <Typography variant="h3" fontWeight={800} sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Kết Nối Cùng Tôi
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                Bạn đang tìm kiếm một Senior Frontend Developer đồng hành trong dự án sắp tới hoặc có cơ hội hợp tác cần trao đổi? Hãy để lại lời nhắn nhé!
              </Typography>

              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton href={`mailto:${PERSONAL_INFO.email}`} color="primary" sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12) }}>
                    <EmailRounded />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Email trực tiếp
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {PERSONAL_INFO.email}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                  <Button
                    component={motion.a}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    variant="outlined"
                    startIcon={<GitHub />}
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                  >
                    GitHub
                  </Button>
                  <Button
                    component={motion.a}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    variant="outlined"
                    startIcon={<LinkedIn />}
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                  >
                    LinkedIn
                  </Button>
                </Stack>
              </Stack>
            </Reveal>

            <Reveal from="right" delay={0.15}>
              <Card component="form" onSubmit={handleSubmit} elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Stack spacing={2.5}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <TextField fullWidth required label="Họ và tên" variant="outlined" />
                    <TextField fullWidth required type="email" label="Địa chỉ Email" variant="outlined" />
                  </Box>
                  <TextField fullWidth required label="Tiêu đề công việc / Dự án" variant="outlined" />
                  <TextField fullWidth required multiline rows={4} label="Nội dung trao đổi..." variant="outlined" />
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendRounded />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      boxShadow: (theme) => `0 10px 25px -5px ${alpha(theme.palette.primary.main, 0.45)}`,
                    }}
                  >
                    Gửi tin nhắn
                  </Button>
                </Stack>
              </Card>
            </Reveal>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {REAL_CV_INFO.name} ({REAL_CV_INFO.brand}). Senior Frontend Developer Portfolio.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" href={PERSONAL_INFO.github} target="_blank" color="inherit" aria-label="GitHub">
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton size="small" href={PERSONAL_INFO.linkedin} target="_blank" color="inherit" aria-label="LinkedIn">
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton size="small" href={`mailto:${PERSONAL_INFO.email}`} color="inherit" aria-label="Email">
                <EmailRounded fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Container>

        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
          <Alert severity="success" variant="filled" sx={{ width: '100%', fontWeight: 600 }}>
            Cảm ơn bạn! Tin nhắn công việc đã được gửi thành công.
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

// ============================================================================
// 4. MAIN APP & QUẢN LÝ MỞ KHÓA MẬT KHẨU
// ============================================================================
export default function App() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [simulatorOpen, setSimulatorOpen] = useState(false)
  const [cansCount, setCansCount] = useState(4)

  // State mở khóa Tab Bí Mật lưu trong sessionStorage
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_UNLOCK_KEY) === 'true'
  })
  const [activeTab, setActiveTab] = useState<'drinking' | 'real_cv'>(() => {
    const unlocked = sessionStorage.getItem(SESSION_UNLOCK_KEY) === 'true'
    const savedTab = sessionStorage.getItem(SESSION_TAB_KEY)
    return unlocked && savedTab === 'real_cv' ? 'real_cv' : 'drinking'
  })

  // State cho hộp thoại nhập mật khẩu
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [authToast, setAuthToast] = useState<{ open: boolean; message: string; severity: 'success' | 'info' }>({
    open: false,
    message: '',
    severity: 'success',
  })

  useSmoothScroll()

  const toggleMode = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const handleOpenPasswordDialog = () => {
    setPasswordInput('')
    setPasswordError('')
    setPasswordDialogOpen(true)
  }

  const handleUnlockSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (passwordInput.trim() === SECRET_PASSWORD.trim()) {
      sessionStorage.setItem(SESSION_UNLOCK_KEY, 'true')
      sessionStorage.setItem(SESSION_TAB_KEY, 'real_cv')
      setIsUnlocked(true)
      setActiveTab('real_cv')
      setPasswordDialogOpen(false)
      setPasswordInput('')
      setPasswordError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setAuthToast({
        open: true,
        message: '🍻 Đúng pass đồng nhậu! Mời vào bàn trong lúc còn tỉnh táo!',
        severity: 'success',
      })
    } else {
      setPasswordError('Sai pass rồi! Mới uống 2 lon đã hoa mắt bấm nhầm đúng không? 🍺')
    }
  }

  const handleToggleTab = (tab: 'drinking' | 'real_cv') => {
    setActiveTab(tab)
    sessionStorage.setItem(SESSION_TAB_KEY, tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLockSecret = () => {
    sessionStorage.removeItem(SESSION_UNLOCK_KEY)
    sessionStorage.removeItem(SESSION_TAB_KEY)
    setIsUnlocked(false)
    setActiveTab('drinking')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setAuthToast({
      open: true,
      message: '🔒 Đã đóng cửa bàn trong — Quay lại sảnh nhậu chính!',
      severity: 'info',
    })
  }

  const getDrunkStatus = (cans: number) => {
    if (cans <= 4) {
      return {
        level: 'Khởi động làm mát cổ họng (15% Công lực)',
        comment: 'Mới súc miệng lấy vị! Tầm này vẫn còn ngồi code sửa bug production bình thường.',
        progress: 15,
      }
    }
    if (cans <= 10) {
      return {
        level: 'Vào phom bắt nhịp (40% Công lực)',
        comment: 'Mặt hơi hồng hào, bắt đầu bật chế độ tiếng Anh giao tiếp và phân tích tình hình kinh tế thế giới.',
        progress: 40,
      }
    }
    if (cans <= 18) {
      return {
        level: 'Đỉnh cao phong độ (75% Công lực)',
        comment: 'Bắt đầu khoác vai anh em nói chuyện nghĩa khí, ai mời cũng "100% không long đền!".',
        progress: 75,
      }
    }
    if (cans < 24) {
      return {
        level: 'Cận ngưỡng Siêu Xay-da (92% Công lực)',
        comment: 'Vẫn khẳng định "Tao chưa xỉn nha!", nhưng đã kích hoạt phản xạ tự nhiên đi WC lúc kêu tính tiền.',
        progress: 92,
      }
    }
    return {
      level: 'Full Kết Bất Tử — Mở Khóa Tăng 3 Karaoke (100% Công lực)',
      comment: 'Đã đạt cảnh giới thượng thừa! Đề nghị chuyển gấp sang quán Karaoke hoặc quán cháo lòng gần nhất!',
      progress: 100,
    }
  }

  const drunkStatus = getDrunkStatus(cansCount)

  // Bảng màu phong thủy Mệnh Kim
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#E5C158' : '#B48608',
            light: '#FDE68A',
            dark: '#926B05',
            contrastText: mode === 'dark' ? '#0C0E12' : '#FFFFFF',
          },
          secondary: {
            main: mode === 'dark' ? '#CBD5E1' : '#64748B',
            light: '#F1F5F9',
            dark: '#334155',
          },
          info: {
            main: mode === 'dark' ? '#F59E0B' : '#D97706',
          },
          background: {
            default: mode === 'dark' ? '#0C0E12' : '#F8FAFC',
            paper: mode === 'dark' ? '#141820' : '#FFFFFF',
          },
        },
        typography: {
          fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
          button: { textTransform: 'none' },
        },
        shape: { borderRadius: 12 },
      }),
    [mode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomCursor />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <Navbar
          mode={mode}
          toggleMode={toggleMode}
          onOpenSimulator={() => setSimulatorOpen(true)}
          isUnlocked={isUnlocked}
          activeTab={activeTab}
          onSecretIconClick={handleOpenPasswordDialog}
          onToggleTab={handleToggleTab}
          onLockSecret={handleLockSecret}
        />

        <main>
          {isUnlocked && activeTab === 'real_cv' ? (
            <RealPortfolioView
              onLockSecret={handleLockSecret}
              onSwitchToDrinking={() => handleToggleTab('drinking')}
            />
          ) : (
            <>
              <HeroSection onOpenSimulator={() => setSimulatorOpen(true)} />
              <SkillsSection />
              <ProjectsSection
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenSimulator={() => setSimulatorOpen(true)}
              />
              <ContactSection />
            </>
          )}
        </main>

        {/* Dialog Nhập Mật Khẩu */}
        <Dialog
          open={passwordDialogOpen}
          onClose={() => setPasswordDialogOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <Box component="form" onSubmit={handleUnlockSubmit}>
            <DialogTitle sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
              <SportsBarRounded color="primary" />
              Trạm Kiểm Soát Nồng Độ Cồn
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
                Khu vực này cấm người uống bia bỏ đá quá nửa ly! Đọc đúng ám hiệu bàn nhậu mới được mở cửa đi tiếp:
              </Typography>
              <TextField
                autoFocus
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Đọc pass anh em ơi..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value)
                  if (passwordError) setPasswordError('')
                }}
                error={Boolean(passwordError)}
                helperText={passwordError}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          aria-label="Ẩn/hiện mật khẩu"
                        >
                          {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setPasswordDialogOpen(false)}>Thôi xin kiếu</Button>
              <Button type="submit" variant="contained" sx={{ fontWeight: 700 }}>
                🍺 1, 2, 3 Vào!
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* Dialog Sao kê / Log Kèo Nhậu */}
        <Dialog
          open={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
          maxWidth="sm"
          fullWidth
        >
          {selectedProject && (
            <>
              <DialogTitle sx={{ fontWeight: 800 }}>
                🧾 Sao Kê &amp; Nhật Ký Bàn Nhậu: {selectedProject.title}
              </DialogTitle>
              <DialogContent dividers>
                <Typography variant="subtitle2" color="primary" fontWeight={700} gutterBottom>
                  TỔNG KẾT THIỆT HẠI:
                </Typography>
                <Typography variant="body2" sx={{ mb: 2.5 }}>
                  {selectedProject.billSummary}
                </Typography>

                <Typography variant="subtitle2" color="primary" fontWeight={700} gutterBottom>
                  SYSTEM LOGS (DIỄN BIẾN THỰC TẾ):
                </Typography>
                <Stack
                  spacing={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: (t) => alpha(t.palette.background.default, 0.9),
                    border: '1px solid',
                    borderColor: 'divider',
                    fontFamily: 'monospace',
                  }}
                >
                  {selectedProject.logs.map((log) => (
                    <Typography key={log} variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>
                      {log}
                    </Typography>
                  ))}
                </Stack>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={() => setSelectedProject(null)}>Đóng</Button>
                <Button
                  variant="contained"
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                >
                  Rủ Kèo Tương Tự 🍻
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Dialog Giả Lập Test Đô Online (Live Demo) */}
        <Dialog
          open={simulatorOpen}
          onClose={() => setSimulatorOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 800 }}>
            🍺 Live Demo: Trình Giả Lập Test Đô ({PERSONAL_INFO.name})
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Bấm nút <strong>&ldquo;1, 2, 3 Dô!&rdquo;</strong> bên dưới để kiểm tra độ chịu tải thực tế của bao tử theo từng mức bia:
            </Typography>

            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'primary.main',
                bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                mb: 2.5,
                textAlign: 'center',
              }}
            >
              <Typography variant="h3" fontWeight={800} color="primary.main">
                {cansCount} Lon Bia 🍺
              </Typography>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 0.5 }}>
                {drunkStatus.level}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={drunkStatus.progress}
                sx={{ my: 2, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" color="text.secondary">
                💬 <em>&ldquo;{drunkStatus.comment}&rdquo;</em>
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} justifyContent="center">
              <Button variant="outlined" onClick={() => setCansCount(2)}>
                Reset về 2 lon
              </Button>
              <Button
                variant="contained"
                startIcon={<SportsBarRounded />}
                onClick={() => setCansCount((prev) => Math.min(prev + 2, 30))}
                sx={{ fontWeight: 700 }}
              >
                1, 2, 3 Dô! (+2 Lon)
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setSimulatorOpen(false)}>Đóng Demo</Button>
            <Button
              variant="contained"
              href="#contact"
              onClick={() => setSimulatorOpen(false)}
            >
              Ra Quán Test Thật Luôn!
            </Button>
          </DialogActions>
        </Dialog>

        {/* Thông báo Mở khóa / Khóa lại */}
        <Snackbar
          open={authToast.open}
          autoHideDuration={4000}
          onClose={() => setAuthToast((prev) => ({ ...prev, open: false }))}
        >
          <Alert
            severity={authToast.severity}
            variant="filled"
            sx={{ width: '100%', fontWeight: 600 }}
          >
            {authToast.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  )
}
