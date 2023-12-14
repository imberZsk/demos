import { motion } from 'framer-motion'
const FramerMotion: React.FC = () => {
  return (
    <div>
      <div className="flex-center h-screen">
        <motion.div
          className="h-[200px] w-[200px] rounded-[50%] bg-pink-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: 200 }}
        ></motion.div>
      </div>
      <div className="flex-center h-screen">
        <motion.div
          className="h-[200px] w-[200px] rounded-[50%] bg-pink-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: 200 }}
        ></motion.div>
      </div>
    </div>
  )
}

export default FramerMotion
