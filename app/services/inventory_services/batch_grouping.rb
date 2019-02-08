module InventoryServices
  class BatchGrouping
    def self.group(batches, period)
      grouped = Hash.new
      grouped_batches = batches.group_by_period(period, permit: ["day", "week", "month"]){ |batch| batch.created_at}
      grouped_batches.each{ |date,batches| grouped[date] = { batches: batches, roasted_on_date: batches.pluck(:starting_amount).sum } }
      return grouped
    end
  end
end