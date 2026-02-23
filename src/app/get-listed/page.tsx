import { Metadata } from 'next';
import { getCategories, getTowns } from '@/lib/data';
import GetListedForm from './GetListedForm';

export const metadata: Metadata = {
  title: 'Get Listed',
  description:
    'Submit your business to be featured on Best Sea to Sky — the top directory for restaurants, hotels, activities, and attractions in Squamish, Whistler, and Pemberton.',
};

export default async function GetListedPage() {
  const [categories, towns] = await Promise.all([getCategories(), getTowns()]);

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Get Your Business Listed
        </h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          Join the best businesses in the Sea to Sky corridor. Fill out the form below and
          we&apos;ll review your listing request.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10">
        <GetListedForm categories={categories} towns={towns} />
      </div>
    </section>
  );
}
