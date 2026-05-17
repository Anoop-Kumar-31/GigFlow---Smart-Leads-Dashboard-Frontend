import React, { useState } from 'react';
import { Plus, Download, Mail, Calendar, User } from 'lucide-react';
import { LeadFilters } from '../components/leads/LeadFilters';
import { LeadTable } from '../components/leads/LeadTable';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { LeadForm } from '../components/leads/LeadForm';
import { Badge } from '../components/ui/Badge';
import { useLeads, useDeleteLead, useExportCSV, useCreateLead, useUpdateLead } from '../hooks/useLeads';
import { LeadFilters as ILeadFilters, Lead } from '../types/lead.types';
import { PageLayout } from '../components/layout/PageLayout';

export const LeadsPage: React.FC = () => {
  const [filters, setFilters] = useState<ILeadFilters>({ page: 1, limit: 10 });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useLeads(filters);
  const deleteMutation = useDeleteLead();
  const exportMutation = useExportCSV();
  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead();

  const handleDelete = (id: string) => {
    setLeadToDelete(id);
  };

  const confirmDelete = async () => {
    if (leadToDelete) {
      await deleteMutation.mutateAsync(leadToDelete);
      setLeadToDelete(null);
    }
  };

  const handleCreate = async (formData: any) => {
    await createMutation.mutateAsync(formData);
    setShowCreateModal(false);
  };

  const handleUpdate = async (formData: any) => {
    if (editingLead) {
      await updateMutation.mutateAsync({ id: editingLead._id, data: formData });
      setEditingLead(null);
    }
  };

  return (
    <PageLayout
      title="Leads"
      subtitle={`${data?.pagination.totalRecords ?? 0} total leads`}
      actions={
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => exportMutation.mutate()}
            isLoading={exportMutation.isPending}
            className="w-full sm:w-auto"
          >
            Export CSV
          </Button>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto"
          >
            Add Lead
          </Button>
        </div>
      }
    >
      {/* Filters */}
      <LeadFilters filters={filters} onFiltersChange={setFilters} />

      {/* Table */}
      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4
                            border-primary-600 border-t-transparent" />
          </div>
        ) : isError ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200
                           dark:border-red-800 rounded-xl p-8 text-center">
            <p className="text-red-600 dark:text-red-400 font-medium">
              {(error as Error)?.message ?? 'Failed to load leads'}
            </p>
          </div>
        ) : !data?.data.length ? (
          <EmptyState
            title="No leads found"
            description="No leads match your current filters, or you haven't added any leads yet."
            actionLabel="Add Your First Lead"
            onAction={() => setShowCreateModal(true)}
          />
        ) : (
          <LeadTable
            leads={data.data}
            pagination={data.pagination}
            onEdit={setEditingLead}
            onDelete={handleDelete}
            onView={setViewingLead}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        )}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Lead"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button type="submit" form="lead-form" isLoading={createMutation.isPending}>Create Lead</Button>
          </>
        }
      >
        <LeadForm onSubmit={handleCreate} isLoading={createMutation.isPending} />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingLead}
        onClose={() => setEditingLead(null)}
        title="Edit Lead"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditingLead(null)}>Cancel</Button>
            <Button type="submit" form="lead-form" isLoading={updateMutation.isPending}>Save Changes</Button>
          </>
        }
      >
        {editingLead && (
          <LeadForm
            initialData={editingLead}
            onSubmit={handleUpdate}
            isLoading={updateMutation.isPending}
          />
        )}
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={!!viewingLead}
        onClose={() => setViewingLead(null)}
        title="Lead Details"
        size="md"
        footer={<Button onClick={() => setViewingLead(null)}>Close</Button>}
      >
        {viewingLead && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl font-bold">
                {viewingLead.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{viewingLead.name}</h4>
                <div className="flex gap-2 mt-1">
                  <Badge label={viewingLead.status} variant={viewingLead.status} />
                  <Badge label={viewingLead.source} variant={viewingLead.source} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5" />
                <span>{viewingLead.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Calendar className="w-5 h-5" />
                <span>Created on {new Date(viewingLead.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <User className="w-5 h-5" />
                <span>Added by {viewingLead.createdBy.name}</span>
              </div>
            </div>

            {viewingLead.notes && (
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Notes</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {viewingLead.notes}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!leadToDelete}
        onClose={() => setLeadToDelete(null)}
        title="Confirm Deletion"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setLeadToDelete(null)}>Cancel</Button>
            <Button 
              variant="danger" 
              onClick={confirmDelete} 
              isLoading={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Lead
            </Button>
          </>
        }
      >
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this lead? This action cannot be undone.
        </p>
      </Modal>
    </PageLayout>
  );
};
