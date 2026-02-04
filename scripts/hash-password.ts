import bcrypt from 'bcryptjs'

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  console.log('Password:', password)
  console.log('Hash:', hash)
  console.log('\nSQL Insert Statement:')
  console.log(`INSERT INTO admins (username, password_hash) VALUES ('pxt', '${hash}');`)
}

// 生成密码 hash
const password = process.argv[2] || '20182019'
hashPassword(password)
