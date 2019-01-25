module ImportServices
  class ImportProducers
    
    def self.import(csv)
      @errors = []
      csv_text = File.read(csv)
      csv = CSV.parse(csv_text, :headers => true)
      csv.each do |row|
        @producer = ProducerProfile.new(name: row[0])
        if @producer.save
          @address = @producer.addresses.create(street_1: row[1], street_2: row[2], city: row[3],
            state: row[4], postal_code: row[5], country: row[6])
        else
          @errors << @producer.errors
        end
      end

      if @errors.empty?
        return {all_succeeded: true}
      else
        return {all_succeeded: false, errors: @errors}
      end
    end
  end
end