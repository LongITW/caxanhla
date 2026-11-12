import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'

const overview = [
  { label: 'Dự án đang chạy', value: '04', note: '+2 trong tháng này', color: '#e8f0ff', icon: <BoltRoundedIcon /> },
  { label: 'Việc cần hoàn thành', value: '12', note: '3 việc đến hạn hôm nay', color: '#e9f7ef', icon: <TaskAltRoundedIcon /> },
  { label: 'Tiến độ tổng thể', value: '76%', note: 'Tăng 8% so với tuần trước', color: '#fff3e5', icon: <ArrowForwardRoundedIcon /> },
]

const projects = [
  { name: 'Website thương hiệu', detail: 'Cập nhật giao diện và nội dung', progress: 82, color: '#4467f5', people: ['A', 'M', 'L'] },
  { name: 'Ứng dụng di động', detail: 'Thiết kế trải nghiệm người dùng', progress: 58, color: '#20a779', people: ['T', 'H'] },
  { name: 'Chiến dịch mùa hè', detail: 'Chuẩn bị nội dung ra mắt', progress: 35, color: '#e79536', people: ['N', 'P', 'K'] },
]

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f8fc' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #edf0f5' }}>
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ flexGrow: 1 }}>
            <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: '#4467f5', color: 'white', display: 'grid', placeItems: 'center' }}>
              <BoltRoundedIcon fontSize="small" />
            </Box>
            <Typography variant="h6" fontWeight={750} letterSpacing="-0.4px">Caxanhla</Typography>
          </Stack>
          <IconButton aria-label="Thông báo"><NotificationsNoneRoundedIcon /></IconButton>
          <Avatar sx={{ ml: 1, width: 34, height: 34, bgcolor: '#dce5ff', color: '#3555d8', fontSize: 14, fontWeight: 700 }}>AN</Avatar>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2} sx={{ mb: 4 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>Thứ Tư, 12 tháng 11, 2026</Typography>
            <Typography variant="h4" fontWeight={750} letterSpacing="-1px">Chào buổi sáng, An 👋</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.75 }}>Đây là tổng quan công việc của bạn hôm nay.</Typography>
          </Box>
          <Button variant="contained" startIcon={<AddRoundedIcon />} sx={{ alignSelf: { xs: 'flex-start', sm: 'center' }, px: 2.2, py: 1.1, borderRadius: 2, textTransform: 'none', boxShadow: 'none' }}>
            Tạo dự án mới
          </Button>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 4 }}>
          {overview.map((item) => (
            <Card key={item.label} elevation={0} sx={{ border: '1px solid #edf0f5', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography color="text.secondary" variant="body2">{item.label}</Typography>
                    <Typography variant="h4" fontWeight={750} sx={{ mt: 1 }}>{item.value}</Typography>
                  </Box>
                  <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: item.color, display: 'grid', placeItems: 'center', color: '#3f5ed5' }}>{item.icon}</Box>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>{item.note}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.6fr) minmax(280px, 1fr)' }, gap: 2 }}>
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, border: '1px solid #edf0f5', borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>Dự án của bạn</Typography>
                <Typography variant="body2" color="text.secondary">Theo dõi tiến độ gần đây</Typography>
              </Box>
              <Button endIcon={<ArrowForwardRoundedIcon />} sx={{ textTransform: 'none' }}>Xem tất cả</Button>
            </Stack>
            {projects.map((project, index) => (
              <Box key={project.name}>
                {index > 0 && <Divider sx={{ my: 2.25 }} />}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                  <Box>
                    <Typography fontWeight={650}>{project.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>{project.detail}</Typography>
                  </Box>
                  <IconButton size="small" aria-label={`Tùy chọn ${project.name}`}><MoreHorizRoundedIcon /></IconButton>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 1.7 }}>
                  <Box sx={{ flex: 1, height: 7, bgcolor: '#edf0f5', borderRadius: 5, overflow: 'hidden' }}>
                    <Box sx={{ width: `${project.progress}%`, height: '100%', bgcolor: project.color, borderRadius: 5 }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ minWidth: 32 }}>{project.progress}%</Typography>
                  <Stack direction="row" sx={{ '& > * + *': { ml: -0.7 } }}>
                    {project.people.map((person) => <Avatar key={person} sx={{ width: 25, height: 25, fontSize: 10, border: '2px solid white', bgcolor: '#e9ecf5', color: '#586174' }}>{person}</Avatar>)}
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Paper>

          <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, border: '1px solid #edf0f5', borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={700}>Việc cần làm</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>Ưu tiên trong ngày</Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <TaskAltRoundedIcon sx={{ color: '#20a779', mt: 0.2 }} />
                <Box sx={{ flex: 1 }}><Typography fontWeight={600}>Duyệt bản thiết kế mới</Typography><Typography variant="body2" color="text.secondary">Website thương hiệu</Typography></Box>
                <Chip label="Hôm nay" size="small" sx={{ bgcolor: '#fff3e5', color: '#a46115' }} />
              </Stack>
              <Divider />
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <TaskAltRoundedIcon sx={{ color: '#aeb6c5', mt: 0.2 }} />
                <Box sx={{ flex: 1 }}><Typography fontWeight={600}>Họp nhóm sản phẩm</Typography><Typography variant="body2" color="text.secondary">10:30 · Phòng họp trực tuyến</Typography></Box>
              </Stack>
              <Divider />
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <TaskAltRoundedIcon sx={{ color: '#aeb6c5', mt: 0.2 }} />
                <Box sx={{ flex: 1 }}><Typography fontWeight={600}>Gửi cập nhật tiến độ</Typography><Typography variant="body2" color="text.secondary">Chiến dịch mùa hè</Typography></Box>
              </Stack>
            </Stack>
            <Button fullWidth variant="outlined" startIcon={<AddRoundedIcon />} sx={{ mt: 3, borderRadius: 2, textTransform: 'none' }}>Thêm công việc</Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}

export default App
