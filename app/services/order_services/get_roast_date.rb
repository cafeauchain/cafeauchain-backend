module OrderServices
  class GetRoastDate
    def self.process(order)
      roaster = order.roaster_profile

      cutoff = roaster.cutoff.attributes.select{|(key, value)| key.start_with?("day_")}.map{|(k,v)| v.is_a?(Time) ? v.to_s(:time) : "" }
      order_time = Time.at(order.created_at)
      order_day = Date.parse(order_time.to_s).strftime("%u")

      day_of_week = order_day.to_i
      days_to_add = 0
      until (cutoff[day_of_week].length > 0 && order_time <= formatRoastDate(order_time, days_to_add, cutoff[day_of_week])) || days_to_add >= 7 do
        days_to_add += 1 
        day_of_week += 1
        if day_of_week == 7
          day_of_week = 0
        end  
      end

      cutoff_time = formatRoastDate(order_time, days_to_add, cutoff[day_of_week])
      roast_date = Date.parse(cutoff_time.to_s)

      return roast_date
    end

    private
    def self.formatRoastDate(order_time, days_to_add, cutoff_string)
      Time.parse((Date.parse(order_time.to_s) + days_to_add.day).to_s + " " + cutoff_string)
    end
  end
end
