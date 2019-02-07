module InventoryServices
  class BatchGrouping
    def self.group(batches, period)
      grouped = Hash.new
      grouped_batches = batches.group_by_period(period, permit: ["day", "week", "month"]){ |batch| batch.created_at}
      grouped_batches.each{ |date,batches| grouped[date] = batches.map{ |batch| BatchSerializer.new(batch)}}
      return grouped
    end
  end
end