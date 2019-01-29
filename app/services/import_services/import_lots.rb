module ImportServices
  class ImportLots
    
    def self.import(roaster_profile_id, json_object)
      @roaster = RoasterProfile.find(roaster_profile_id)
      @crop = Crop.find_or_create_by(name: json_object["key_crop_name"])
      @lot = @roaster.lots.create(harvest_year: json_object["key_harvest_year"], pounds_of_coffee: json_object["key_pounds_on_contract"], price_per_pound: json_object["key_price_per_pound"], crop: @crop)
      @batch = @lot.batches.create(starting_amount: json_object["key_pounds_roasted_to_date"].to_f, ending_amount: (json_object["key_pounds_roasted_to_date"].to_f * 0.9))
      LedgerServices::AssetIssueTransaction.new(json_object["key_pounds_on_contract"], @crop.id, @roaster.id).call
      LedgerServices::AssetTransferTransaction.new(json_object["key_pounds_on_hand"], @lot.id, @roaster.id).call
      LedgerServices::RoastTransaction.new(json_object["key_pounds_roasted_to_date"], @batch.id, @roaster.id).call
      if @lot.save
        return {all_succeeded: true}
      else
        return {all_succeeded: false, errors: @lot.errors}
      end
    end
  end
end