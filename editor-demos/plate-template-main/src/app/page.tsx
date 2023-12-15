import { PlateEditor } from '@/components/plate-editor';

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full flex-col gap-4">
        <PlateEditor />
      </div>
    </section>
  );
}
