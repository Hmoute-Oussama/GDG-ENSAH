import JoinForm from '@/components/Forms/JoinForm';

export const metadata = {
  title: 'Join Us | GDG ENSAH',
  description: 'Apply to join Google Developer Groups On Campus ENSAH and become part of our developer community.',
};

export default function JoinPage() {
  return (
    <section className="relative py-32 px-6 min-h-screen flex items-center">
      <div className="container mx-auto max-w-3xl w-full">
        <JoinForm />
      </div>
    </section>
  );
}
