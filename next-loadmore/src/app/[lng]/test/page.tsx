import Button from './button'

export function generateStaticParams() {
  return [{ lng: 'en' }, { lng: 'zh' }]
}

const Index: React.FC = ({ params }: any) => {
  const lng = params.lng
  console.log(lng)
  return (
    <div>
      <div>{lng}</div>
      <Button></Button>
    </div>
  )
}

export default Index
