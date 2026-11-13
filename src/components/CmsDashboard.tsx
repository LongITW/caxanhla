import React, { useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Chip,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Tooltip,
  Snackbar,
  Alert,
  InputAdornment,
  alpha,
} from '@mui/material'
import {
  DashboardRounded,
  ArticleRounded,
  TaskAltRounded,
  GroupsRounded,
  SettingsRounded,
  MenuRounded,
  SearchRounded,
  AddRounded,
  DeleteOutlineRounded,
  EditRounded,
  DarkModeRounded,
  LightModeRounded,
  LogoutRounded,
  TrendingUpRounded,
  VisibilityRounded,
  CheckCircleRounded,
  BoltRounded,
  FolderSpecialRounded,
} from '@mui/icons-material'

const SIDEBAR_WIDTH = 265

type MenuId = 'overview' | 'content' | 'tasks' | 'friends' | 'settings'

interface CmsDashboardProps {
  avatar: string
  userName: string
  userEmail: string
  mode: 'dark' | 'light'
  toggleMode: () => void
  onLockCms: () => void
}

interface ContentItem {
  id: number
  title: string
  category: string
  status: 'Đã xuất bản' | 'Bản nháp' | 'Đang ghim'
  views: number
  updatedAt: string
}

interface TaskItem {
  id: number
  title: string
  priority: 'Cao' | 'Trung bình' | 'Thấp'
  done: boolean
  dueDate: string
}

interface FriendItem {
  id: number
  name: string
  rank: string
  capacity: string
  trustScore: number
  status: 'Sẵn sàng' | 'Đang bận' | 'Trốn bill'
}

const INITIAL_CONTENTS: ContentItem[] = [
  {
    id: 1,
    title: 'SaaS Analytics Dashboard — Kiến trúc React & MUI',
    category: 'Dự án Web',
    status: 'Đang ghim',
    views: 1420,
    updatedAt: 'Hôm nay, 18:30',
  },
  {
    id: 2,
    title: 'Kinh nghiệm tối ưu Lighthouse 100 điểm với Vite & GSAP',
    category: 'Bài viết Tech',
    status: 'Đã xuất bản',
    views: 980,
    updatedAt: 'Hôm qua',
  },
  {
    id: 3,
    title: 'Review quán Lẩu Dê Quận 3 — Mồi bén, rượu êm',
    category: 'Góc Ăn Nhậu',
    status: 'Đã xuất bản',
    views: 3250,
    updatedAt: '2 ngày trước',
  },
  {
    id: 4,
    title: 'Hệ thống AI Code Assistant — Streaming UI',
    category: 'Dự án Web',
    status: 'Bản nháp',
    views: 410,
    updatedAt: '3 ngày trước',
  },
]

const INITIAL_TASKS: TaskItem[] = [
  { id: 1, title: 'Tối ưu hiệu ứng GSAP ScrollTrigger trên trang chủ', priority: 'Cao', done: true, dueDate: 'Hôm nay' },
  { id: 2, title: 'Cập nhật danh sách dự án mới lên CMS', priority: 'Cao', done: false, dueDate: 'Ngày mai' },
  { id: 3, title: 'Chốt lịch kèo cuối tuần với anh em chiến hữu', priority: 'Trung bình', done: false, dueDate: 'Thứ 7' },
  { id: 4, title: 'Refactor cấu trúc theme Mệnh Kim', priority: 'Thấp', done: true, dueDate: 'Đã xong' },
]

const INITIAL_FRIENDS: FriendItem[] = [
  { id: 1, name: 'Minh "Bất Tử"', rank: 'Chiến Thần Tăng 3', capacity: '1.5 Kết Tiger', trustScore: 98, status: 'Sẵn sàng' },
  { id: 2, name: 'Tuấn "Full-stack"', rank: 'Dũng Sĩ Diệt Mồi', capacity: '8 Lon + 2 Dĩa Ốc', trustScore: 85, status: 'Sẵn sàng' },
  { id: 3, name: 'Hùng "Low Latency"', rank: 'Thánh Đi WC Lúc Tính Tiền', capacity: '5 Lon (Hay giả xỉn)', trustScore: 45, status: 'Trốn bill' },
  { id: 4, name: 'Hoàng "DevOps"', rank: 'Chuyên Gia Pha Soju', capacity: '1 Kết Heineken', trustScore: 92, status: 'Đang bận' },
]

const MENU_ITEMS: { id: MenuId; label: string; badge?: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Tổng quan (Dashboard)', icon: <DashboardRounded /> },
  { id: 'content', label: 'Bài viết & Dự án', badge: '4', icon: <ArticleRounded /> },
  { id: 'tasks', label: 'Công việc & Ghi chú', badge: '2', icon: <TaskAltRounded /> },
  { id: 'friends', label: 'Sổ Kèo & Chiến Hữu', icon: <GroupsRounded /> },
  { id: 'settings', label: 'Hồ sơ & Cài đặt', icon: <SettingsRounded /> },
]

export const CmsDashboard: React.FC<CmsDashboardProps> = ({
  avatar,
  userName,
  userEmail,
  mode,
  toggleMode,
  onLockCms,
}) => {
  const [activeMenu, setActiveMenu] = useState<MenuId>('overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // State Quản lý Bài viết / Dự án
  const [contents, setContents] = useState<ContentItem[]>(INITIAL_CONTENTS)
  const [openAddContent, setOpenAddContent] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Dự án Web')
  const [newStatus, setNewStatus] = useState<ContentItem['status']>('Đã xuất bản')

  // State Quản lý Công việc & Ghi chú
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [quickNote, setQuickNote] = useState(
    '📌 Ghi chú cá nhân:\n- Mật khẩu cổng chính lưu ở file .env (VITE_SECRET_PASSWORD)\n- Cuối tuần nhớ mang theo thuốc giải rượu khi đi kèo Quận 1.\n- Ý tưởng side-project: App chia tiền nhậu tự động tính phụ phí cho mấy đứa chỉ ăn mồi.',
  )

  // State Sổ Kèo
  const [friends] = useState<FriendItem[]>(INITIAL_FRIENDS)

  // State Cài đặt
  const [siteTitle, setSiteTitle] = useState('Caxanhla | Hồ Sơ Đô Nhậu & CMS')
  const [statusMessage, setStatusMessage] = useState('Đang khát nước • Sẵn sàng nổ địa chỉ 24/7')
  const [allowBooking, setAllowBooking] = useState(true)
  const [autoReplyToast, setAutoReplyToast] = useState(true)
  const [toast, setToast] = useState('')

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const item: ContentItem = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      status: newStatus,
      views: 1,
      updatedAt: 'Vừa xong',
    }
    setContents((prev) => [item, ...prev])
    setNewTitle('')
    setOpenAddContent(false)
    setToast('Đã thêm nội dung mới vào CMS!')
  }

  const handleDeleteContent = (id: number) => {
    setContents((prev) => prev.filter((item) => item.id !== id))
    setToast('Đã xóa mục nội dung!')
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    setTasks((prev) => [
      { id: Date.now(), title: newTaskTitle.trim(), priority: 'Cao', done: false, dueDate: 'Hôm nay' },
      ...prev,
    ])
    setNewTaskTitle('')
    setToast('Đã thêm công việc mới!')
  }

  const handleToggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const filteredContents = contents.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Nội dung Sidebar dùng chung cho Desktop & Mobile
  const sidebarContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Logo CMS */}
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 3, height: 72 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 900,
            boxShadow: (t) => `0 6px 16px -4px ${alpha(t.palette.primary.main, 0.5)}`,
          }}
        >
          <BoltRounded />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={800} lineHeight={1.2}>
            Caxanhla
            <Box component="span" sx={{ color: 'primary.main' }}>
              .CMS
            </Box>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Command Center v2.0
          </Typography>
        </Box>
      </Stack>

      <Divider />

      {/* Thẻ thông tin Admin */}
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            p: 1.5,
            borderRadius: 3,
            bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
            border: '1px solid',
            borderColor: (t) => alpha(t.palette.primary.main, 0.22),
          }}
        >
          <Avatar
            src={avatar}
            alt={userName}
            slotProps={{ img: { style: { objectFit: 'contain', transform: 'scale(1.12) translateY(4%)' } } }}
            sx={{ width: 44, height: 44, bgcolor: '#fff', border: '2px solid', borderColor: 'primary.main' }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" fontWeight={700} noWrap>
              {userName}
            </Typography>
            <Chip
              label="Root Admin 🍺"
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: '0.68rem', fontWeight: 700, mt: 0.3 }}
            />
          </Box>
        </Stack>
      </Box>

      {/* Danh sách Menu */}
      <Box sx={{ px: 1.5, flexGrow: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={700}
          sx={{ px: 1.5, mb: 1, display: 'block', letterSpacing: 1 }}
        >
          MENU QUẢN TRỊ
        </Typography>
        <List disablePadding>
          {MENU_ITEMS.map((item) => {
            const selected = activeMenu === item.id
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.6 }}>
                <ListItemButton
                  selected={selected}
                  onClick={() => {
                    setActiveMenu(item.id)
                    setMobileOpen(false)
                  }}
                  sx={{
                    borderRadius: 2.5,
                    py: 1.15,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': { bgcolor: 'primary.main' },
                      '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 38, color: selected ? 'inherit' : 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: selected ? 700 : 600, fontSize: '0.9rem' }}
                  />
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        bgcolor: selected ? 'rgba(0,0,0,0.22)' : 'action.selected',
                        color: selected ? 'inherit' : 'text.primary',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>

      <Divider />

      {/* Nút hành động dưới đáy Sidebar */}
      <Stack spacing={1} sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutRounded />}
          onClick={onLockCms}
          sx={{ borderRadius: 2.5, fontWeight: 700, justifyContent: 'flex-start', px: 2 }}
        >
          Khóa &amp; Thoát ra ngoài
        </Button>
      </Stack>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar cố định trên Desktop */}
      <Box
        component="nav"
        sx={{
          width: { md: SIDEBAR_WIDTH },
          flexShrink: { md: 0 },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box sx={{ width: SIDEBAR_WIDTH, position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 1100 }}>
          {sidebarContent}
        </Box>
      </Box>

      {/* Drawer Sidebar trên Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Khu vực Nội dung Chính (Main Content) */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header của CMS */}
        <Box
          sx={{
            height: 72,
            px: { xs: 2, md: 4 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1050,
            backdropFilter: 'blur(14px)',
            bgcolor: (t) => alpha(t.palette.background.default, 0.85),
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' } }}>
              <MenuRounded />
            </IconButton>
            <Box>
              <Typography variant="h6" fontWeight={800}>
                {MENU_ITEMS.find((m) => m.id === activeMenu)?.label}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <TextField
              size="small"
              placeholder="Tìm kiếm nhanh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
               sx={{ display: { xs: 'none', sm: 'block' }, width: 220 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Tooltip title="Khóa & Thoát ra ngoài">
              <IconButton
                onClick={onLockCms}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                <Box component="span" sx={{ fontSize: '1.05rem', lineHeight: 1 }}>
                  🍺
                </Box>
              </IconButton>
            </Tooltip>

            <Tooltip title={mode === 'dark' ? 'Chuyển sang Sáng' : 'Chuyển sang Tối'}>
              <IconButton
                onClick={toggleMode}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                {mode === 'dark' ? <LightModeRounded fontSize="small" /> : <DarkModeRounded fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Nội dung từng Tab Menu */}
        <Box sx={{ p: { xs: 2.5, md: 4 }, flexGrow: 1 }}>
          {/* ==================== 1. TAB TỔNG QUAN ==================== */}
          {activeMenu === 'overview' && (
            <Stack spacing={3.5}>
              {/* 4 Thẻ KPI */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                  gap: 2.5,
                }}
              >
                {[
                  {
                    label: 'Tổng lượt ghé thăm',
                    value: '12,840',
                    change: '+24% tháng này',
                    icon: <VisibilityRounded color="primary" />,
                  },
                  {
                    label: 'Dự án & Bài viết',
                    value: String(contents.length),
                    change: 'Đang hoạt động tốt',
                    icon: <FolderSpecialRounded color="primary" />,
                  },
                  {
                    label: 'Công việc hoàn thành',
                    value: `${tasks.filter((t) => t.done).length}/${tasks.length}`,
                    change: 'Đúng tiến độ',
                    icon: <CheckCircleRounded color="primary" />,
                  },
                  {
                    label: 'Chỉ số Phong thủy Kim',
                    value: '99.9%',
                    change: 'Hoàng Kim Vượng Khí',
                    icon: <TrendingUpRounded color="primary" />,
                  },
                ].map((kpi) => (
                  <Card
                    key={kpi.label}
                    elevation={0}
                    sx={{
                      borderRadius: 3.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            {kpi.label}
                          </Typography>
                          <Typography variant="h4" fontWeight={800} sx={{ my: 0.5 }}>
                            {kpi.value}
                          </Typography>
                          <Chip
                            label={kpi.change}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
                              color: 'primary.main',
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            p: 1.2,
                            borderRadius: 2.5,
                            bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
                            display: 'flex',
                          }}
                        >
                          {kpi.icon}
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Biểu đồ & Tiến độ */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
                  gap: 3,
                }}
              >
                {/* Biểu đồ tăng trưởng */}
                <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        Biểu Đồ Năng Suất &amp; Độ Nhiệt (6 Tháng)
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Tương quan giữa số dòng Code và số lon Bia tiêu thụ
                      </Typography>
                    </Box>
                    <Chip label="Live Metrics" color="primary" size="small" sx={{ fontWeight: 700 }} />
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="flex-end"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ height: 210, pt: 4, px: 1 }}
                  >
                    {[
                      { month: 'Thg 6', code: 65, beer: 45 },
                      { month: 'Thg 7', code: 78, beer: 60 },
                      { month: 'Thg 8', code: 55, beer: 85 },
                      { month: 'Thg 9', code: 90, beer: 70 },
                      { month: 'Thg 10', code: 84, beer: 92 },
                      { month: 'Thg 11', code: 98, beer: 88 },
                    ].map((bar) => (
                      <Stack key={bar.month} alignItems="center" spacing={1} sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={0.6} alignItems="flex-end" sx={{ height: 160, width: '100%', justifyContent: 'center' }}>
                          <Tooltip title={`Hiệu suất Code: ${bar.code}%`}>
                            <Box
                              sx={{
                                width: { xs: 12, sm: 18 },
                                height: `${bar.code}%`,
                                bgcolor: 'primary.main',
                                borderRadius: '6px 6px 2px 2px',
                                transition: 'height 0.4s ease',
                              }}
                            />
                          </Tooltip>
                          <Tooltip title={`Phong độ Bàn Nhậu: ${bar.beer}%`}>
                            <Box
                              sx={{
                                width: { xs: 12, sm: 18 },
                                height: `${bar.beer}%`,
                                bgcolor: 'secondary.main',
                                opacity: 0.65,
                                borderRadius: '6px 6px 2px 2px',
                                transition: 'height 0.4s ease',
                              }}
                            />
                          </Tooltip>
                        </Stack>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          {bar.month}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>

                {/* Trạng thái Hệ thống & Kỹ năng */}
                <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: 3 }}>
                  <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
                    Chỉ Số Hệ Thống Cá Nhân
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
                    Trạng thái vận hành thời gian thực
                  </Typography>

                  <Stack spacing={2.5}>
                    {[
                      { name: 'React / Next.js / TypeScript', val: 95 },
                      { name: 'UI/UX & GSAP Motion', val: 90 },
                      { name: 'Sức chịu tải Deadline', val: 88 },
                      { name: 'Sức chịu tải Cồn (High Availability)', val: 96 },
                    ].map((metric) => (
                      <Box key={metric.name}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {metric.name}
                          </Typography>
                          <Typography variant="body2" fontWeight={700} color="primary.main">
                            {metric.val}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={metric.val}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Box>

              {/* Bảng nội dung mới nhất */}
              <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight={800}>
                    Dự Án &amp; Bài Viết Gần Đây
                  </Typography>
                  <Button size="small" onClick={() => setActiveMenu('content')}>
                    Xem tất cả
                  </Button>
                </Stack>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Tiêu đề</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Danh mục</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          Lượt xem
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contents.slice(0, 4).map((row) => (
                        <TableRow key={row.id} hover>
                          <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              size="small"
                              color={row.status === 'Bản nháp' ? 'default' : 'primary'}
                              variant={row.status === 'Đang ghim' ? 'filled' : 'outlined'}
                            />
                          </TableCell>
                          <TableCell align="right">{row.views.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Stack>
          )}

          {/* ==================== 2. TAB QUẢN LÝ BÀI VIẾT & DỰ ÁN ==================== */}
          {activeMenu === 'content' && (
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    Quản Lý Bài Viết &amp; Dự Án
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thêm mới, chỉnh sửa hoặc đổi trạng thái hiển thị các dự án và bài blog của bạn.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddRounded />}
                  onClick={() => setOpenAddContent(true)}
                  sx={{ fontWeight: 700, borderRadius: 2.5, alignSelf: 'flex-start' }}
                >
                  Thêm nội dung mới
                </Button>
              </Stack>

              <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Tiêu đề</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Danh mục</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Cập nhật</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          Lượt xem
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          Thao tác
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredContents.map((row) => (
                        <TableRow key={row.id} hover>
                          <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                          <TableCell>
                            <Chip label={row.category} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              size="small"
                              color={row.status === 'Bản nháp' ? 'default' : 'primary'}
                            />
                          </TableCell>
                          <TableCell>{row.updatedAt}</TableCell>
                          <TableCell align="right">{row.views.toLocaleString()}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteContent(row.id)}
                              aria-label="Xóa"
                            >
                              <DeleteOutlineRounded fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Stack>
          )}

          {/* ==================== 3. TAB CÔNG VIỆC & GHI CHÚ ==================== */}
          {activeMenu === 'tasks' && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
                gap: 3,
              }}
            >
              {/* Danh sách việc cần làm */}
              <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: 3 }}>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
                  Danh Sách Công Việc (Todo List)
                </Typography>

                <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Nhập công việc hoặc mục tiêu mới..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                  <Button type="submit" variant="contained" startIcon={<AddRounded />} sx={{ fontWeight: 700, px: 2.5 }}>
                    Thêm
                  </Button>
                </Box>

                <Stack spacing={1.5}>
                  {tasks.map((task) => (
                    <Stack
                      key={task.id}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      onClick={() => handleToggleTask(task.id)}
                      sx={{
                        p: 1.75,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: task.done ? 'divider' : 'primary.main',
                        bgcolor: (t) => (task.done ? 'transparent' : alpha(t.palette.primary.main, 0.05)),
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <CheckCircleRounded color={task.done ? 'success' : 'disabled'} />
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{ textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.6 : 1 }}
                          >
                            {task.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Hạn: {task.dueDate}
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip
                        label={task.priority}
                        size="small"
                        color={task.priority === 'Cao' ? 'primary' : 'default'}
                        variant="outlined"
                      />
                    </Stack>
                  ))}
                </Stack>
              </Card>

              {/* Bảng ghi chú nhanh */}
              <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: 3 }}>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                  Sổ Tay Ghi Chú Nhanh (Scratchpad)
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                  Lưu nhanh ý tưởng, mật khẩu hoặc danh sách quán ngon
                </Typography>
                <TextField
                  multiline
                  rows={10}
                  fullWidth
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditRounded />}
                  onClick={() => setToast('Đã lưu ghi chú nhanh!')}
                  sx={{ fontWeight: 700, borderRadius: 2.5 }}
                >
                  Lưu Ghi Chú
                </Button>
              </Card>
            </Box>
          )}

          {/* ==================== 4. TAB SỔ KÈO & CHIẾN HỮU ==================== */}
          {activeMenu === 'friends' && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="h5" fontWeight={800}>
                  Sổ Kèo &amp; Danh Sách Chiến Hữu (CRM Bàn Nhậu)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Theo dõi đô nhậu, độ uy tín và lịch sử trốn bill của từng thành viên trong hội.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2.5,
                }}
              >
                {friends.map((friend) => (
                  <Card
                    key={friend.id}
                    elevation={0}
                    sx={{ borderRadius: 3.5, border: '1px solid', borderColor: 'divider', p: 2.5 }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 800 }}>
                          {friend.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={800}>
                            {friend.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {friend.rank}
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip
                        label={friend.status}
                        size="small"
                        color={
                          friend.status === 'Sẵn sàng'
                            ? 'success'
                            : friend.status === 'Trốn bill'
                              ? 'error'
                              : 'default'
                        }
                      />
                    </Stack>

                    <Typography variant="body2" sx={{ mb: 1.5 }}>
                      🍺 <strong>Tửu lượng:</strong> {friend.capacity}
                    </Typography>

                    <Box>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Điểm uy tín bàn nhậu (Trust Score)
                        </Typography>
                        <Typography variant="caption" fontWeight={700} color="primary.main">
                          {friend.trustScore}/100
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={friend.trustScore}
                        color={friend.trustScore < 50 ? 'error' : 'primary'}
                        sx={{ height: 7, borderRadius: 4 }}
                      />
                    </Box>
                  </Card>
                ))}
              </Box>
            </Stack>
          )}

          {/* ==================== 5. TAB HỒ SƠ & CÀI ĐẶT ==================== */}
          {activeMenu === 'settings' && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
                gap: 3,
              }}
            >
              <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: 3, textAlign: 'center' }}>
                <Avatar
                  src={avatar}
                  alt={userName}
                  slotProps={{ img: { style: { objectFit: 'contain', transform: 'scale(1.12) translateY(4%)' } } }}
                  sx={{
                    width: 140,
                    height: 140,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: '#fff',
                    border: '3px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <Typography variant="h6" fontWeight={800}>
                  {userName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {userEmail}
                </Typography>
                <Chip label="Mệnh Kim • Hoàng Kim Bạch Kim" color="primary" variant="outlined" sx={{ fontWeight: 700 }} />
              </Card>

              <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: 3 }}>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5 }}>
                  Cấu Hình Hệ Thống CMS
                </Typography>
                <Stack spacing={2.5}>
                  <TextField
                    label="Tiêu đề Website"
                    fullWidth
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                  />
                  <TextField
                    label="Trạng thái Hero Banner (Trang ngoài)"
                    fullWidth
                    value={statusMessage}
                    onChange={(e) => setStatusMessage(e.target.value)}
                  />
                  <FormControlLabel
                    control={<Switch checked={allowBooking} onChange={(e) => setAllowBooking(e.target.checked)} />}
                    label="Cho phép đồng nhậu đặt lịch lên kèo 24/7"
                  />
                  <FormControlLabel
                    control={<Switch checked={autoReplyToast} onChange={(e) => setAutoReplyToast(e.target.checked)} />}
                    label="Bật thông báo tự động khi có người chốt kèo"
                  />
                  <Button
                    variant="contained"
                    onClick={() => setToast('Đã lưu cấu hình hệ thống thành công!')}
                    sx={{ fontWeight: 700, borderRadius: 2.5, alignSelf: 'flex-start', px: 3 }}
                  >
                    Lưu Cấu Hình
                  </Button>
                </Stack>
              </Card>
            </Box>
          )}
        </Box>
      </Box>

      {/* Dialog Thêm Bài Viết / Dự Án Mới */}
      <Dialog open={openAddContent} onClose={() => setOpenAddContent(false)} maxWidth="xs" fullWidth>
        <Box component="form" onSubmit={handleAddContent}>
          <DialogTitle sx={{ fontWeight: 800 }}>Thêm Nội Dung Mới</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2.5} sx={{ pt: 0.5 }}>
              <TextField
                autoFocus
                required
                fullWidth
                label="Tiêu đề dự án / bài viết"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <TextField
                select
                fullWidth
                label="Danh mục"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <MenuItem value="Dự án Web">Dự án Web</MenuItem>
                <MenuItem value="Bài viết Tech">Bài viết Tech</MenuItem>
                <MenuItem value="Góc Ăn Nhậu">Góc Ăn Nhậu</MenuItem>
              </TextField>
              <TextField
                select
                fullWidth
                label="Trạng thái"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ContentItem['status'])}
              >
                <MenuItem value="Đã xuất bản">Đã xuất bản</MenuItem>
                <MenuItem value="Đang ghim">Đang ghim</MenuItem>
                <MenuItem value="Bản nháp">Bản nháp</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenAddContent(false)}>Hủy</Button>
            <Button type="submit" variant="contained" sx={{ fontWeight: 700 }}>
              Lưu Nội Dung
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Snackbar open={Boolean(toast)} autoHideDuration={3500} onClose={() => setToast('')}>
        <Alert severity="success" variant="filled" sx={{ fontWeight: 600 }}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  )
}
