import { getResultClass, getResultIcon, Result } from "@/lib/result";
import { Calculator } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface BimesterGrades {
  nota10: number;
  estudoDirigido: number;
  provao: number;
  frequencia: number;
}

export function Bimester() {
  const [bimesterGrades, setBimesterGrades] = useState<BimesterGrades>({
    nota10: 0,
    estudoDirigido: 0,
    provao: 0,
    frequencia: 1
  });
  const [bimesterResult, setBimesterResult] = useState<Result | null>(null);

  const calculateBimester = () => {
    const { nota10, estudoDirigido, provao, frequencia } = bimesterGrades;
    const total = nota10 + estudoDirigido + provao + frequencia;
    
    let result: Result;
    
    if (total >= 5) {
      result = {
        type: 'success',
        message: 'Parabéns! Você passou!',
        total
      };
    } else {
      result = {
        type: 'fail',
        message: 'Você não atingiu nota suficiente para passar nesse bimestre.',
        total
      };
    }
    
    setBimesterResult(result);
  };

  const handleBimesterChange = (field: keyof BimesterGrades, value: string) => {
    const numValue = parseFloat(value) || 0;

    const formatter: Record<keyof BimesterGrades, number> = {
      estudoDirigido: Math.min(10, Math.max(0, numValue)),
      provao: Math.min(10, Math.max(0, numValue)),
      frequencia: Math.min(1, Math.max(0, numValue)),
      nota10: Math.min(2, Math.max(0, numValue)),
    }

    setBimesterGrades(prev => ({
      ...prev,
      [field]: formatter[field]//field === 'frequencia' ? Math.min(1, Math.max(0, numValue)) : Math.min(10, Math.max(0, numValue))
    }));
  };

  return (
    <Card className="card-math fade-in">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Cálculo Bimestral</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Preencha suas notas e frequência para calcular se você passou na disciplina.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Aluno Nota 10 (0-2)
            </label>
            <Input
              type="number"
              min="0"
              max="2"
              step="0.1"
              placeholder="Ex: 1.8"
              className="input-field"
              value={bimesterGrades.nota10 || ''}
              onChange={(e) => handleBimesterChange('nota10', e.target.value)}
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
              value={bimesterGrades.estudoDirigido || ''}
              onChange={(e) => handleBimesterChange('estudoDirigido', e.target.value)}
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
              value={bimesterGrades.provao || ''}
              onChange={(e) => handleBimesterChange('provao', e.target.value)}
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
              step="0.1"
              placeholder="Ex: 0.85"
              className="input-field"
              value={bimesterGrades.frequencia || ''}
              onChange={(e) => handleBimesterChange('frequencia', e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Exemplo: 0.80 = 80% de presença
            </p>
          </div>
        </div>

        <Button
          onClick={calculateBimester}
          className="btn-primary w-full mt-6"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calcular Resultado
        </Button>

        {bimesterResult && (
          <div className={`mt-6 ${getResultClass(bimesterResult.type)} fade-in`}>
            <div className="flex items-center gap-3">
              {getResultIcon(bimesterResult.type)}
              <div>
                <p className="font-semibold">{bimesterResult.message}</p>

                <div className='flex flex-col'>
                  {bimesterResult.total !== undefined && (
                    <p className="text-sm opacity-90">
                      Total: {bimesterResult.total?.toFixed(2)}
                    </p>
                  )}
                  {bimesterResult.average !== undefined && (
                    <p className="text-sm opacity-90">
                      Média: {bimesterResult.average?.toFixed(2)}
                    </p>
                  )}
                  {bimesterGrades.frequencia !== undefined && (
                    <p className="text-sm opacity-90">
                      Frequência: {(bimesterGrades.frequencia * 100).toFixed(0)}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}