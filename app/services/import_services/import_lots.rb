module ImportServices
  class ImportLots
    
    def self.import(roaster_profile_id, json_object)
      @roaster = RoasterProfile.find(roaster_profile_id)
      @producer = ProducerProfile.find_or_create_by(name: json_object["key_producer_name"])
      @crop = @producer.crops.find_or_create_by(name: json_object["key_crop_name"])
      @lot = @roaster.lots.create(harvest_year: json_object["key_harvest_year"], pounds_of_coffee: json_object["key_pounds_on_contract"].to_f, price_per_pound: json_object["key_price_per_pound"].to_f, crop: @crop)
      @batch = @lot.batches.create(starting_amount: json_object["key_pounds_roasted_to_date"].to_f, ending_amount: (json_object["key_pounds_roasted_to_date"].to_f * 0.9))
      LedgerServices::AssetIssueTransaction.new(json_object["key_pounds_on_contract"].to_f, @crop.id, @roaster.id).call
      LedgerServices::AssetTransferTransaction.new(json_object["key_pounds_on_contract"].to_f, @lot.id, @roaster.id).call
      LedgerServices::AssetDeliveryTransaction.new(json_object["key_pounds_on_hand"].to_f, @batch.id, @roaster.id).call
      if @lot.save
        return {all_succeeded: true}
      else
        return {all_succeeded: false, errors: @lot.errors}
      end
    end
  end
end