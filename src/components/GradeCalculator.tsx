import { BookOpen, Calculator, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Annual } from './Annual';
import { Bimester } from './Bimester';

const GradeCalculator = () => {
  const [activeTab, setActiveTab] = useState<'bimester' | 'annual'>('bimester');

  return (
    <div className="min-h-screen bg-background math-bg relative">
      <div className="max-w-md mx-auto px-4 pt-2 relative z-10">
        <div className="max-w-md mx-auto pb-12">
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

          <div className="hidden md:flex bg-white rounded-sm border mb-2 px-4 py-2 justify-between w-full max-w-md">
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

          {/* Bimester Tab */}
          {activeTab === 'bimester' && (
            <Bimester />
          )}

          {/* Annual Tab */}
          {activeTab === 'annual' && (
            <Annual />
          )}
            <p className="text-xs text-center text-muted-foreground">
              💡 Ferramenta criada para autoavaliação.
              <br/> Feito por Weickmam Machado.
            </p>
        </div>
        {/* <div className="mb-2 max-w-md flex flex-col items-center gap-2">
          </div> */}

        <div className="block md:hidden fixed bottom-0 right-0 left-0 w-full bg-white border-t pt-2 border">
              <div className="flex items-center mx-auto gap-8 max-w-md">
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
      </div>
    </div>
  );
};

export default GradeCalculator;