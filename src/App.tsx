import React, { useState, useMemo } from 'react'
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
  alpha,
} from '@mui/material'
import {
  DarkModeRounded,
  LightModeRounded,
  GitHub,
  LinkedIn,
  EmailRounded,
  LaunchRounded,
  CodeRounded,
  DownloadRounded,
  SendRounded,
  MenuRounded,
  CloseRounded,
  TerminalRounded,
  StorageRounded,
  BrushRounded,
} from '@mui/icons-material'
import { motion, type Variants } from 'framer-motion'
import avatarImg from './assets/Image.jpeg'

// ============================================================================
// 1. DỮ LIỆU CÁ NHÂN (/* THAY INFO CỦA BẠN VÀO ĐÂY */)
// ============================================================================
const PERSONAL_INFO = {
  /* THAY INFO CỦA BẠN VÀO ĐÂY: Họ tên, chức danh, bio, ảnh đại diện, liên kết */
  name: 'Nguyễn Văn An',
  brand: 'Caxanhla',
  role: 'Senior Frontend Developer',
  tagline: 'Xây dựng trải nghiệm web tốc độ cao, tinh tế và lấy người dùng làm trung tâm.',
  bio: 'Tôi là một lập trình viên Frontend với hơn 3 năm kinh nghiệm chuyên sâu về hệ sinh thái React, Next.js và TypeScript. Đam mê kiến trúc giao diện mở rộng (Scalable UI), tối ưu hiệu năng và tạo ra những hiệu ứng tương tác mượt mà.',
  avatar: avatarImg,
  email: 'contact@caxanhla.dev',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  cvUrl: '#contact', // Thay bằng đường dẫn file PDF CV của bạn (ví dụ: '/cv-nguyen-van-an.pdf')
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

/* THAY INFO CỦA BẠN VÀO ĐÂY: Danh sách kỹ năng theo nhóm */
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Core',
    icon: <CodeRounded color="primary" />,
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Redux Toolkit'],
  },
  {
    title: 'UI & Animation',
    icon: <BrushRounded color="secondary" />,
    skills: ['Material UI (MUI)', 'Tailwind CSS', 'Framer Motion', 'Responsive Design', 'Figma'],
  },
  {
    title: 'Backend & Công cụ',
    icon: <StorageRounded color="info" />,
    skills: ['Node.js', 'RESTful APIs', 'GraphQL', 'Git / GitHub', 'Vite', 'Docker'],
  },
]

interface ProjectItem {
  title: string
  description: string
  image: string
  techStack: string[]
  githubUrl: string
  demoUrl: string
}

/* THAY INFO CỦA BẠN VÀO ĐÂY: Danh sách các dự án nổi bật */
const PROJECTS: ProjectItem[] = [
  {
    title: 'SaaS Analytics Dashboard',
    description:
      'Nền tảng quản trị và phân tích dữ liệu thời gian thực cho doanh nghiệp E-commerce với biểu đồ tương tác trực quan và chế độ Dark Mode.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    techStack: ['Next.js', 'TypeScript', 'Material UI', 'Recharts'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    title: 'TaskFlow - Quản lý Dự án Agile',
    description:
      'Ứng dụng Kanban board hỗ trợ kéo thả mượt mà, cộng tác nhóm theo thời gian thực thông qua WebSockets và hệ thống thông báo thông minh.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=80',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'Socket.io'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    title: 'AI Code Assistant Platform',
    description:
      'Giao diện web hiện đại tích hợp trợ lý AI cho lập trình viên, tối ưu điểm hiệu năng Lighthouse 100/100 cùng trải nghiệm gõ phím mượt mà.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    techStack: ['React', 'MUI', 'Framer Motion', 'Vite'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    title: 'FinTrack - Quản lý Tài chính Cá nhân',
    description:
      'Ứng dụng theo dõi chi tiêu và lập ngân sách thông minh, hỗ trợ xuất báo cáo tự động và đồng bộ hóa đa thiết bị.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    techStack: ['Next.js', 'TypeScript', 'MUI', 'Chart.js'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
]

const NAV_ITEMS = [
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Dự án', href: '#projects' },
  { label: 'Liên hệ', href: '#contact' },
]

// ============================================================================
// 2. CẤU HÌNH HIỆU ỨNG FRAMER MOTION
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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 },
  },
}

// ============================================================================
// 3. CÁC COMPONENTS GIAO DIỆN
// ============================================================================

interface NavbarProps {
  mode: 'dark' | 'light'
  toggleMode: () => void
}

const Navbar: React.FC<NavbarProps> = ({ mode, toggleMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

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
            <TerminalRounded color="primary" fontSize="large" />
            <Typography variant="h6" fontWeight={800} letterSpacing="-0.5px">
              {PERSONAL_INFO.brand}
              <Box component="span" sx={{ color: 'primary.main' }}>
                .dev
              </Box>
            </Typography>
          </Stack>

          {/* Menu trên Desktop */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.label}
                href={item.href}
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  px: 2,
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                }}
              >
                {item.label}
              </Button>
            ))}

            <IconButton
              onClick={toggleMode}
              color="inherit"
              aria-label="Chuyển đổi giao diện sáng/tối"
              sx={{
                ml: 1,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'rotate(15deg)', borderColor: 'primary.main' },
              }}
            >
              {mode === 'dark' ? <LightModeRounded fontSize="small" /> : <DarkModeRounded fontSize="small" />}
            </IconButton>
          </Stack>

          {/* Nút điều khiển trên Mobile */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
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
              {PERSONAL_INFO.brand}.dev
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseRounded />
            </IconButton>
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component="a" href={item.href} onClick={() => setMobileOpen(false)}>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box
      id="about"
      sx={{
        pt: { xs: 7, md: 13 },
        pb: { xs: 9, md: 15 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            gap: { xs: 6, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Cột nội dung giới thiệu */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Chip
                label="🚀 Sẵn sàng cho các dự án mới"
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
                  fontSize: { xs: '2.35rem', sm: '3.1rem', md: '3.6rem' },
                  lineHeight: 1.15,
                  letterSpacing: '-1px',
                  mb: 2,
                }}
              >
                Xin chào, tôi là{' '}
                <Box
                  component="span"
                  sx={{
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
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 580, lineHeight: 1.8 }}>
                {PERSONAL_INFO.bio}
              </Typography>
            </motion.div>

            {/* 2 nút CTA */}
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
                    fontWeight: 600,
                    boxShadow: (theme) => `0 10px 25px -5px ${alpha(theme.palette.primary.main, 0.45)}`,
                  }}
                >
                  Xem dự án
                </Button>

                <Button
                  component={motion.a}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  variant="outlined"
                  size="large"
                  href={PERSONAL_INFO.cvUrl}
                  startIcon={<DownloadRounded />}
                  sx={{
                    py: 1.5,
                    px: 3.5,
                    borderRadius: 2.5,
                    fontWeight: 600,
                  }}
                >
                  Tải CV / Liên hệ
                </Button>
              </Stack>
            </motion.div>
          </motion.div>

          {/* Cột Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: { xs: 240, md: 320 },
                  height: { xs: 240, md: 320 },
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(212, 175, 55, 0.42), rgba(226, 232, 240, 0.28))',
                  filter: 'blur(42px)',
                  zIndex: 0,
                }}
              />
              <Avatar
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                slotProps={{
                  img: {
                    style: {
                      objectFit: 'cover',
                      objectPosition: 'center 18%',
                    },
                  },
                }}
                sx={{
                  width: { xs: 220, md: 300 },
                  height: { xs: 220, md: 300 },
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: (theme) =>
                    `0 20px 45px -12px ${alpha(theme.palette.primary.main, 0.4)}`,
                  zIndex: 1,
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

const SkillsSection: React.FC = () => {
  return (
    <Box id="skills" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Typography
              variant="overline"
              color="primary"
              fontWeight={700}
              letterSpacing={1.5}
              display="block"
              textAlign="center"
            >
              NĂNG LỰC CỐT LÕI
            </Typography>
            <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
              Giới thiệu & Kỹ năng
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ maxWidth: 620, mx: 'auto', mb: 6, lineHeight: 1.75 }}
            >
              {PERSONAL_INFO.tagline} Dưới đây là các công nghệ và công cụ tôi sử dụng hàng ngày để kiến tạo sản phẩm.
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3.5,
            }}
          >
            {SKILL_CATEGORIES.map((category) => (
              <motion.div key={category.title} variants={fadeInUp} style={{ height: '100%' }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 1,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
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
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

const ProjectsSection: React.FC = () => {
  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Typography
              variant="overline"
              color="primary"
              fontWeight={700}
              letterSpacing={1.5}
              display="block"
              textAlign="center"
            >
              PORTFOLIO
            </Typography>
            <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
              Dự án tiêu biểu
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ maxWidth: 620, mx: 'auto', mb: 6, lineHeight: 1.75 }}
            >
              Các dự án thực tế được đầu tư kỹ lưỡng về kiến trúc code, hiệu năng xử lý và trải nghiệm tương tác người dùng.
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 4,
            }}
          >
            {PROJECTS.map((project) => (
              <motion.div key={project.title} variants={fadeInUp} style={{ height: '100%' }}>
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
                    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      borderColor: 'primary.main',
                      boxShadow: (theme) => `0 20px 35px -10px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={project.image}
                    alt={project.title}
                    sx={{ objectFit: 'cover' }}
                  />
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
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

const ContactSection: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /* THAY INFO CỦA BẠN VÀO ĐÂY: Tích hợp API gửi mail thực tế (EmailJS / Formspree) nếu cần */
    setOpenSnackbar(true)
    e.currentTarget.reset()
  }

  return (
    <Box id="contact" sx={{ pt: { xs: 8, md: 12 }, pb: 6, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
              gap: { xs: 5, md: 6 },
              alignItems: 'center',
            }}
          >
            {/* Thông tin liên hệ */}
            <motion.div variants={fadeInUp}>
              <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5}>
                LIÊN HỆ
              </Typography>
              <Typography variant="h3" fontWeight={800} sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Kết nối cùng tôi
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                Bạn đang tìm kiếm một Frontend Developer đồng hành trong dự án sắp tới hoặc có câu hỏi cần trao đổi? Hãy để lại lời nhắn nhé!
              </Typography>

              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton
                    href={`mailto:${PERSONAL_INFO.email}`}
                    color="primary"
                    sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12) }}
                  >
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
            </motion.div>

            {/* Form liên hệ */}
            <motion.div variants={fadeInUp}>
              <Card
                component="form"
                onSubmit={handleSubmit}
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack spacing={2.5}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 2,
                    }}
                  >
                    <TextField fullWidth required label="Họ và tên" variant="outlined" />
                    <TextField fullWidth required type="email" label="Địa chỉ Email" variant="outlined" />
                  </Box>
                  <TextField fullWidth required label="Tiêu đề" variant="outlined" />
                  <TextField fullWidth required multiline rows={4} label="Nội dung tin nhắn..." variant="outlined" />
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
                      fontWeight: 600,
                      boxShadow: (theme) => `0 10px 25px -5px ${alpha(theme.palette.primary.main, 0.45)}`,
                    }}
                  >
                    Gửi tin nhắn
                  </Button>
                </Stack>
              </Card>
            </motion.div>
          </Box>
        </motion.div>

        <Divider sx={{ my: 6 }} />

        {/* Footer */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {PERSONAL_INFO.name} ({PERSONAL_INFO.brand}). Thiết kế với React, Material UI & Framer Motion.
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
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Cảm ơn bạn! Tin nhắn đã được gửi thành công.
        </Alert>
      </Snackbar>
    </Box>
  )
}

// ============================================================================
// 4. MAIN APP & CẤU HÌNH THEME DARK/LIGHT
// ============================================================================
export default function App() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // Bảng màu phong thủy Mệnh Kim (Bản mệnh Kim: Bạch Kim / Bạc / Trắng & Tương sinh Thổ sinh Kim: Hoàng Kim / Hổ Phách)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#E5C158' : '#B48608', // Hoàng Kim / Champagne Gold (Thổ sinh Kim & Bản mệnh Kim)
            light: '#FDE68A',
            dark: '#926B05',
            contrastText: mode === 'dark' ? '#0C0E12' : '#FFFFFF',
          },
          secondary: {
            main: mode === 'dark' ? '#CBD5E1' : '#64748B', // Bạch Kim / Platinum Silver (Bản mệnh Kim)
            light: '#F1F5F9',
            dark: '#334155',
          },
          info: {
            main: mode === 'dark' ? '#F59E0B' : '#D97706', // Hổ phách ánh đồng (Thổ tương sinh)
          },
          background: {
            default: mode === 'dark' ? '#0C0E12' : '#F8FAFC', // Đen ánh thép (Gunmetal) / Trắng Bạch Kim (Pearl White)
            paper: mode === 'dark' ? '#141820' : '#FFFFFF', // Xám Titan tối (Dark Titanium) / Trắng tinh khiết
          },
        },
        typography: {
          fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
          button: {
            textTransform: 'none',
          },
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <main>
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </Box>
    </ThemeProvider>
  )
}
