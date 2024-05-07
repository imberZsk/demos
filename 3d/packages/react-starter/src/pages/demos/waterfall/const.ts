// 生成不同的数值，用来做高度
export const ArrData: string[] = []
Array(10)
  .fill(0)
  .forEach(() => {
    const str = Math.random() * 400 + 'px'
    ArrData.push(str)
  })
