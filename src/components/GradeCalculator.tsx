import React, { useState } from 'react';
import { Calculator, BookOpen, GraduationCap, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface SemesterGrades {
  nota10: number;
  estudoDirigido: number;
  provao: number;
  frequencia: number;
}

interface AnnualGrades {
  bimestre1: number;
  bimestre2: number;
  bimestre3: number;
  bimestre4: number;
}

type ResultType = 'success' | 'fail' | 'attendance';

interface Result {
  type: ResultType;
  message: string;
  average?: number;
  total?: number;
}

const GradeCalculator = () => {
  const [activeTab, setActiveTab] = useState<'semester' | 'annual'>('semester');
  const [semesterGrades, setSemesterGrades] = useState<SemesterGrades>({
    nota10: 0,
    estudoDirigido: 0,
    provao: 0,
    frequencia: 1
  });
  const [annualGrades, setAnnualGrades] = useState<AnnualGrades>({
    bimestre1: 0,
    bimestre2: 0,
    bimestre3: 0,
    bimestre4: 0
  });
  const [semesterResult, setSemesterResult] = useState<Result | null>(null);
  const [annualResult, setAnnualResult] = useState<Result | null>(null);

  const calculateSemester = () => {
    const { nota10, estudoDirigido, provao, frequencia } = semesterGrades;
    const average = (nota10 + estudoDirigido + provao) / 3;
    
    let result: Result;
    
    if (frequencia < 0.75) {
      result = {
        type: 'attendance',
        message: 'Você foi reprovado por falta.',
        average
      };
    } else if (average >= 5) {
      result = {
        type: 'success',
        message: 'Parabéns! Você passou!',
        average
      };
    } else {
      result = {
        type: 'fail',
        message: 'Você foi reprovado.',
        average
      };
    }
    
    setSemesterResult(result);
  };

  const calculateAnnual = () => {
    const { bimestre1, bimestre2, bimestre3, bimestre4 } = annualGrades;
    const total = bimestre1 + bimestre2 + bimestre3 + bimestre4;
    
    let result: Result;
    
    if (total >= 20) {
      result = {
        type: 'success',
        message: 'Parabéns! Você passou!',
        total
      };
    } else {
      result = {
        type: 'fail',
        message: 'Você foi reprovado.',
        total
      };
    }
    
    setAnnualResult(result);
  };

  const handleSemesterChange = (field: keyof SemesterGrades, value: string) => {
    const numValue = parseFloat(value) || 0;
    setSemesterGrades(prev => ({
      ...prev,
      [field]: field === 'frequencia' ? Math.min(1, Math.max(0, numValue)) : Math.min(10, Math.max(0, numValue))
    }));
  };

  const handleAnnualChange = (field: keyof AnnualGrades, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAnnualGrades(prev => ({
      ...prev,
      [field]: Math.min(10, Math.max(0, numValue))
    }));
  };

  const getResultIcon = (type: ResultType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6" />;
      case 'fail':
        return <XCircle className="w-6 h-6" />;
      case 'attendance':
        return <AlertTriangle className="w-6 h-6" />;
    }
  };

  const getResultClass = (type: ResultType) => {
    switch (type) {
      case 'success':
        return 'result-success pulse-success';
      case 'fail':
        return 'result-error';
      case 'attendance':
        return 'result-warning';
    }
  };

  return (
    <div className="min-h-screen bg-background math-bg relative">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
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

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('semester')}
              className={`tab-button flex-1 flex items-center justify-center gap-2 ${
                activeTab === 'semester' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Semestral
            </button>
            <button
              onClick={() => setActiveTab('annual')}
              className={`tab-button flex-1 flex items-center justify-center gap-2 ${
                activeTab === 'annual' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Anual
            </button>
          </div>

          {/* Semester Tab */}
          {activeTab === 'semester' && (
            <Card className="card-math fade-in">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Cálculo Semestral</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Preencha suas notas e frequência para calcular se você passou na disciplina.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nota 10 (0-10)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="Ex: 7.5"
                      className="input-field"
                      value={semesterGrades.nota10 || ''}
                      onChange={(e) => handleSemesterChange('nota10', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Estudo Dirigido (0-10)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="Ex: 8.0"
                      className="input-field"
                      value={semesterGrades.estudoDirigido || ''}
                      onChange={(e) => handleSemesterChange('estudoDirigido', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Provão (0-10)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="Ex: 6.5"
                      className="input-field"
                      value={semesterGrades.provao || ''}
                      onChange={(e) => handleSemesterChange('provao', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Frequência (0-1)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      placeholder="Ex: 0.85"
                      className="input-field"
                      value={semesterGrades.frequencia || ''}
                      onChange={(e) => handleSemesterChange('frequencia', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Exemplo: 0.85 = 85% de presença
                    </p>
                  </div>
                </div>

                <Button
                  onClick={calculateSemester}
                  className="btn-primary w-full mt-6"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular Resultado
                </Button>

                {semesterResult && (
                  <div className={`mt-6 ${getResultClass(semesterResult.type)} fade-in`}>
                    <div className="flex items-center gap-3">
                      {getResultIcon(semesterResult.type)}
                      <div>
                        <p className="font-semibold">{semesterResult.message}</p>
                        <p className="text-sm opacity-90">
                          Média: {semesterResult.average?.toFixed(2)} | 
                          Frequência: {(semesterGrades.frequencia * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Annual Tab */}
          {activeTab === 'annual' && (
            <Card className="card-math fade-in">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Cálculo Anual</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Insira as notas dos 4 bimestres. Você precisa de 20 pontos ou mais para passar.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      1º Bimestre (0-10)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="Ex: 7.0"
                      className="input-field"
                      value={annualGrades.bimestre1 || ''}
                      onChange={(e) => handleAnnualChange('bimestre1', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      2º Bimestre (0-10)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="Ex: 8.0"
                      className="input-field"
                      value={annualGrades.bimestre2 || ''}
                      onChange={(e) => handleAnnualChange('bimestre2', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      3º Bimestre (0-10)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="Ex: 6.5"
                      className="input-field"
                      value={annualGrades.bimestre3 || ''}
                      onChange={(e) => handleAnnualChange('bimestre3', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      4º Bimestre (0-10)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="Ex: 7.5"
                      className="input-field"
                      value={annualGrades.bimestre4 || ''}
                      onChange={(e) => handleAnnualChange('bimestre4', e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={calculateAnnual}
                  className="btn-primary w-full mt-6"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular Resultado
                </Button>

                {annualResult && (
                  <div className={`mt-6 ${getResultClass(annualResult.type)} fade-in`}>
                    <div className="flex items-center gap-3">
                      {getResultIcon(annualResult.type)}
                      <div>
                        <p className="font-semibold">{annualResult.message}</p>
                        <p className="text-sm opacity-90">
                          Total: {annualResult.total}/40 pontos
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground">
              💡 Ferramenta criada para autoavaliação acadêmica
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeCalculator;