import React, { useState } from 'react';
import { UploadCloud, FileText, Search, Sparkles, Eye, Download, CheckCircle2 } from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { CourseMaterial } from '../../types/database.types';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';

export const MaterialsPage: React.FC = () => {
  const courses = dbStore.getCourses();
  const [materials, setMaterials] = useState<CourseMaterial[]>(() => dbStore.getMaterials());
  const [selectedCourseId, setSelectedCourseId] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<CourseMaterial | null>(null);

  // Upload Form State
  const [targetCourseId, setTargetCourseId] = useState(courses[0]?.id || 'c-101');
  const [unitNumber, setUnitNumber] = useState(2);
  const [topicName, setTopicName] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [fileType, setFileType] = useState('pdf');
  const [extractedText, setExtractedText] = useState('');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialTitle || !topicName) return;

    const newMat = dbStore.addMaterial({
      course_id: targetCourseId,
      unit_number: Number(unitNumber),
      topic_name: topicName,
      title: materialTitle,
      file_url: `https://example.com/materials/${materialTitle.toLowerCase().replace(/\s+/g, '-')}.${fileType}`,
      file_type: fileType,
      file_size: 1850000,
      storage_path: `${targetCourseId}/unit-${unitNumber}/${materialTitle}.${fileType}`,
      extracted_text: extractedText || `Sample extracted lecture notes for ${topicName}. Includes core definitions, structural properties, algorithmic invariant proofs, and performance trade-offs.`,
    });

    setMaterials(dbStore.getMaterials());
    setIsUploadModalOpen(false);
    setTopicName('');
    setMaterialTitle('');
    setExtractedText('');
  };

  const filteredMaterials = selectedCourseId === 'all'
    ? materials
    : materials.filter((m) => m.course_id === selectedCourseId);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
            Course Materials & Content Studio
          </h1>
          <p className="text-sm text-espresso-600 mt-0.5">
            Upload PDFs, PPTs, and DOCX files organized by unit and topic. Text is automatically parsed to ground Gemini question generation.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsUploadModalOpen(true)}
          leftIcon={<UploadCloud className="w-4 h-4" />}
        >
          Upload Course Material
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-cream-300 pb-3 overflow-x-auto">
        <button
          onClick={() => setSelectedCourseId('all')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            selectedCourseId === 'all'
              ? 'bg-terracotta-500 text-white shadow-warm'
              : 'bg-white text-espresso-700 hover:bg-cream-200 border border-cream-300'
          }`}
        >
          All Materials ({materials.length})
        </button>
        {courses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourseId(c.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedCourseId === c.id
                ? 'bg-terracotta-500 text-white shadow-warm'
                : 'bg-white text-espresso-700 hover:bg-cream-200 border border-cream-300'
            }`}
          >
            {c.code}
          </button>
        ))}
      </div>

      {/* Materials Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Syllabus Materials ({filteredMaterials.length})</CardTitle>
          <Badge variant="warm">Supabase Storage Synced</Badge>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-espresso-700">
            <thead className="bg-cream-100/70 border-b border-cream-200 text-xs font-bold text-espresso-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Document Title</th>
                <th className="px-6 py-4">Unit & Topic</th>
                <th className="px-6 py-4">Format</th>
                <th className="px-6 py-4">Text Extraction</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filteredMaterials.map((m) => (
                <tr key={m.id} className="hover:bg-cream-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-espresso-900 block leading-tight">
                          {m.title}
                        </span>
                        <span className="text-[11px] text-espresso-400">
                          Uploaded {new Date(m.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold bg-cream-200 text-espresso-800 px-2 py-0.5 rounded mr-2">
                      Unit {m.unit_number}
                    </span>
                    <span className="text-xs text-espresso-700 font-medium">{m.topic_name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded-md">
                      {m.file_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Parsed ({m.extracted_text?.length || 0} chars)
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewMaterial(m)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Inspect Text
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Material Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Course Syllabus Material"
        description="Add lecture slides or textbooks in PDF, PPTX, or DOCX."
        maxWidth="2xl"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Select Course"
              value={targetCourseId}
              onChange={(e) => setTargetCourseId(e.target.value)}
              options={courses.map((c) => ({ value: c.id, label: `${c.code}: ${c.title}` }))}
            />
            <Input
              label="Unit Number"
              type="number"
              min={1}
              max={10}
              value={unitNumber}
              onChange={(e) => setUnitNumber(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Topic Name"
              placeholder="e.g. Binary Search Trees & AVL Rotations"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              required
            />
            <Select
              label="File Format"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              options={[
                { value: 'pdf', label: 'PDF Document (.pdf)' },
                { value: 'pptx', label: 'PowerPoint Slides (.pptx)' },
                { value: 'docx', label: 'Word Document (.docx)' },
                { value: 'txt', label: 'Plain Text Notes (.txt)' },
              ]}
            />
          </div>

          <Input
            label="File Name / Document Title"
            placeholder="e.g. Unit 2: Balanced Search Trees Lecture Notes.pdf"
            value={materialTitle}
            onChange={(e) => setMaterialTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-espresso-700 mb-1.5">
              Extracted Lecture Excerpt (Used by Gemini AI)
            </label>
            <textarea
              rows={4}
              placeholder="Paste or preview the extracted textual content for question generation..."
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              className="w-full rounded-2xl border border-cream-300 bg-white p-3 text-xs text-espresso-900 focus:outline-none focus:ring-2 focus:ring-terracotta-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-cream-200">
            <Button variant="outline" type="button" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" leftIcon={<UploadCloud className="w-4 h-4" />}>
              Save Material
            </Button>
          </div>
        </form>
      </Modal>

      {/* Preview Extracted Text Modal */}
      <Modal
        isOpen={!!previewMaterial}
        onClose={() => setPreviewMaterial(null)}
        title={previewMaterial?.title}
        description={`Parsed text for Unit ${previewMaterial?.unit_number}: ${previewMaterial?.topic_name}`}
        maxWidth="2xl"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="p-4 bg-cream-100 rounded-2xl border border-cream-300 text-xs text-espresso-900 whitespace-pre-line leading-relaxed font-sans">
            {previewMaterial?.extracted_text}
          </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setPreviewMaterial(null)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
