interface EmptyStateProps {
  selectedDept?: string
  selectedSection?: string
}

export default function EmptyState({ selectedDept, selectedSection }: EmptyStateProps) {
  return (
    <div className="text-muted-foreground text-center py-20 p-6">
      {selectedDept && selectedSection && (
        <h2>
          {selectedDept} - {selectedSection}
        </h2>
      )}

      <p>
        เลือกแผนกจากเมนูด้านซ้ายเพื่อดูข้อมูล
      </p>
    </div>
  )
}
