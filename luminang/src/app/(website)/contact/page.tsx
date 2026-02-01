import { Card } from '@/components/ui';
import { Developer } from '@/types';
import { SITE_CONFIG } from '@/lib/constants';

const developers: Developer[] = [
  {
    name: 'Jerome Benitez',
    role: 'Project Manager',
    subtitle: 'Research and Development',
    email: 'jerome.benitez@luminang.com',
  },
  {
    name: 'Irah Mae Faner',
    role: 'Lead Developer',
    subtitle: 'Research and Development',
    email: 'irah.faner@luminang.com',
  },
  {
    name: 'Ellaiza Rose Pesons',
    role: '3D Artist',
    subtitle: 'Research and Development',
    email: 'ellaiza.pesons@luminang.com',
  },
  {
    name: 'Kyros Emmanuel Quirimit',
    role: 'UI/UX Designer',
    subtitle: 'Research and Development',
    email: 'kyros.quirimit@luminang.com',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-black via-amber-950/10 to-black pt-32">
      <div className="section-container">
        <div className="text-center mb-16">
          <h1 className="text-amber-400 font-serif text-5xl mb-4">
            CONTACT US
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Meet the team behind Luminang. We are dedicated to bringing Philippine culture and language to life through gaming.
          </p>
          <a 
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-amber-400 text-xl font-semibold hover:text-amber-300 transition-colors"
          >
            {SITE_CONFIG.email}
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {developers.map((dev) => (
            <Card key={dev.name} className="text-center bg-gradient-to-br from-amber-900/20 to-zinc-900 border-amber-700/30">
              <div className="w-40 h-40 mx-auto mb-6 bg-zinc-800 rounded-full overflow-hidden border-4 border-amber-600">
                <div className="w-full h-full flex items-center justify-center text-amber-500 text-6xl font-bold">
                  {dev.name.charAt(0)}
                </div>
              </div>
              <h2 className="text-amber-300 font-serif text-2xl mb-2">{dev.name}</h2>
              <p className="text-amber-400 font-semibold mb-1">{dev.role}</p>
              <p className="text-gray-400 text-sm mb-4">{dev.subtitle}</p>
              <a href={`mailto:${dev.email}`} className="text-gray-400 text-sm hover:text-amber-500 transition-colors block">
                {dev.email}
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}