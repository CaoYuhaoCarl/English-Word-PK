import React, { useState } from 'react';
import { Users, UserPlus, X, Settings2, BookOpen, CheckSquare } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Student {
  id: string;
  name: string;
}

const DEMO_STUDENTS: Student[] = [
  { id: '1', name: 'Hugo' },
  { id: '2', name: 'Feifei' },
  { id: '3', name: 'Emily' },
  { id: '4', name: 'Karen' },
  { id: '5', name: 'Ruby' },
  { id: '6', name: 'Lisa' },
  { id: '7', name: 'ZMH' },
  { id: '8', name: 'WYC' },
  { id: '9', name: 'ZZX' },
  { id: '10', name: 'Amelia' },
  { id: '11', name: 'Fancy' },
];




interface StudentSelectorProps {
  onSelectPlayers: (players: Student[], wordsPerPlayer: number) => void;
}

export function StudentSelector({ onSelectPlayers }: StudentSelectorProps) {
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [isSelecting, setIsSelecting] = useState(true);
  const [wordsPerPlayer, setWordsPerPlayer] = useState(10);

  const handleSelectStudent = (student: Student) => {
    if (!selectedStudents.find(s => s.id === student.id)) {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    setSelectedStudents(selectedStudents.filter(s => s.id !== studentId));
  };

  const handleSelectAll = () => {
    setSelectedStudents(DEMO_STUDENTS);
  };

  const handleClearAll = () => {
    setSelectedStudents([]);
  };

  const handleStartBattle = () => {
    if (selectedStudents.length >= 2) {
      onSelectPlayers(selectedStudents, wordsPerPlayer);
      setIsSelecting(false);
    }
  };

  if (!isSelecting) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
      <div className="w-full h-full max-w-2xl mx-auto p-4 overflow-y-auto">
        <Card className="w-full p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center text-primary-900">
              <Users className="w-8 h-8 mr-3 text-primary-500" />
              单词 PK 设置
            </h2>
          </div>

          {/* Game Settings */}
          <div className="mb-8 bg-primary-50 rounded-xl p-6 border border-primary-100">
            <h3 className="text-lg font-semibold flex items-center mb-4 text-primary-800">
              <Settings2 className="w-5 h-5 mr-2" />
              训练设置
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  每位学生答题数量
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={wordsPerPlayer}
                    onChange={(e) => setWordsPerPlayer(Number(e.target.value))}
                    className="flex-1 h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <div className="flex items-center bg-white px-3 py-1 rounded-lg shadow-sm border border-primary-100">
                    <BookOpen className="w-4 h-4 text-primary-500 mr-2" />
                    <span className="font-semibold text-primary-700">{wordsPerPlayer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center text-primary-800">
                <Users className="w-5 h-5 mr-2" />
                选择参与学生
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={CheckSquare}
                  onClick={handleSelectAll}
                >
                  全选
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={X}
                  onClick={handleClearAll}
                >
                  清空
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4 max-h-32 overflow-y-auto">
              {selectedStudents.map(student => (
                <div
                  key={student.id}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg flex items-center shadow-sm"
                >
                  {student.name}
                  <button
                    onClick={() => handleRemoveStudent(student.id)}
                    className="ml-2 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
              {DEMO_STUDENTS.map(student => (
                <button
                  key={student.id}
                  onClick={() => handleSelectStudent(student)}
                  disabled={selectedStudents.find(s => s.id === student.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedStudents.find(s => s.id === student.id)
                      ? 'bg-primary-50 border-primary-200 text-primary-800'
                      : 'hover:bg-primary-50 border-primary-100 hover:border-primary-300'
                  }`}
                >
                  <div className="font-semibold">{student.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center sticky bottom-0 bg-white pt-4">
            <div className="space-y-1">
              <div className="text-sm font-medium text-primary-900">
                已选择 {selectedStudents.length} 名学生
              </div>
              <div className="text-sm text-primary-600">
                总单词量: {selectedStudents.length * wordsPerPlayer}
              </div>
            </div>
            <Button
              onClick={handleStartBattle}
              disabled={selectedStudents.length < 2}
              icon={UserPlus}
              size="lg"
            >
              开始练习
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}