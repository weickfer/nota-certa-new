import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export type ResultType = 'success' | 'fail' | 'attendance';

export interface Result {
  type: ResultType;
  message: string;
  average?: number;
  total?: number;
  semestre1?: string;
  semestre2?: string;
}

export const getResultIcon = (type: ResultType) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-6 h-6" />;
    case 'fail':
      return <XCircle className="w-6 h-6" />;
    case 'attendance':
      return <AlertTriangle className="w-6 h-6" />;
  }
};

export const getResultClass = (type: ResultType) => {
  switch (type) {
    case 'success':
      return 'result-success pulse-success';
    case 'fail':
      return 'result-error';
    case 'attendance':
      return 'result-warning';
  }
};