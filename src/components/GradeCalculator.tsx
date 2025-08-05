import { BookOpen, Calculator, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Annual } from './Annual';
import { Bimester } from './Bimester';

const GradeCalculator = () => {
  const [activeTab, setActiveTab] = useState<'bimester' | 'annual'>('bimester');

  return (
    <div className="min-h-screen bg-background math-bg relative">
      <div className="max-w-md mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-primary to-primary-glow rounded-xl">
                <Calculator className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Calculadora de Notas</h1>
                <p className="text-sm text-muted-foreground">Descubra se você passou!</p>
              </div>
            </div>
          </div>

          {/* Bimester Tab */}
          {activeTab === 'bimester' && (
            <Bimester />
          )}

          {/* Annual Tab */}
          {activeTab === 'annual' && (
            <Annual />
          )}

          {/* Tabs */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">
              💡 Ferramenta criada para autoavaliação acadêmica
            </p>
            <div className="bg-white rounded-full shadow-md px-4 py-2 flex justify-between w-[90%] max-w-md">
              <button
                onClick={() => setActiveTab('bimester')}
                className={`flex flex-col items-center justify-center flex-1 text-xs ${activeTab === 'bimester' ? 'text-blue-600' : 'text-gray-400'
                  }`}
              >
                <BookOpen className="w-5 h-5 mb-1" />
                Bimestral
              </button>

              <button
                onClick={() => setActiveTab('annual')}
                className={`flex flex-col items-center justify-center flex-1 text-xs ${activeTab === 'annual' ? 'text-blue-600' : 'text-gray-400'
                  }`}
              >
                <GraduationCap className="w-5 h-5 mb-1" />
                Anual
              </button>
            </div>
          </div>

          {/* Footer */}
          {/* <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-xs text-muted-foreground">
              💡 Ferramenta criada para autoavaliação acadêmica
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GradeCalculator;