import { getResultClass, getResultIcon, Result } from "@/lib/result";
import { Calculator } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface AnnualGrades {
  bimestre1: number;
  bimestre2: number;
  bimestre3: number;
  bimestre4: number;
}

export function Annual() {
  const [annualGrades, setAnnualGrades] = useState<AnnualGrades>({
    bimestre1: 0,
    bimestre2: 0,
    bimestre3: 0,
    bimestre4: 0
  });
  const [annualResult, setAnnualResult] = useState<Result | null>(null);

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
        message: 'Você não atingiu nota suficiente para passar nesse bimestre.',
        total
      };
    }
    
    setAnnualResult(result);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 100)
  };

  const handleAnnualChange = (field: keyof AnnualGrades, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAnnualGrades(prev => ({
      ...prev,
      [field]: Math.min(10, Math.max(0, numValue))
    }));
  };

  return (
    <Card className="mb-4 card-math fade-in">
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
                  Sua nota: {annualResult.total}/40 pontos
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}