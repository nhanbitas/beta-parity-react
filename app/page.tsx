import AccordionDemo from '@components/demo/AccordionDemo';
import BadgeDemo from '@components/demo/BadgeDemo';;

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <AccordionDemo />
      <BadgeDemo />
    </main>
  );
}
