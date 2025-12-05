const user = users.find(u => 
  u.email === email && u.password === password
)

if (user) {
  // Guarda el usuario en Pinia
  authStore.login(user)
  
  // Redirecciona según el rol
  if (user.role === 'admin') {
    router.push('/admin/dashboard')
  } else if (user.role === 'customer') {
    router.push('/customer/home')
  }
}