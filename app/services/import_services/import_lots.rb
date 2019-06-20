module ImportServices
  class ImportLots

    def self.import(roaster_profile_id, json_object)
      @roaster = RoasterProfile.find(roaster_profile_id)
      @producer = ProducerProfile.find_or_create_by(name: json_object["key_producer_name"])
      @crop = @producer.crops.find_or_create_by(name: json_object["key_crop_name"])
      pounds_of_coffee = json_object["key_pounds_on_contract"].to_f
      pounds_on_hand = json_object["key_pounds_on_hand"].to_f
      pounds_roasted = json_object["key_pounds_roasted_to_date"].to_f
      @lot = @roaster.lots.create(
        harvest_year: json_object["key_harvest_year"],
        origin: json_object["origin"],
        pounds_of_coffee: pounds_of_coffee,
        price_per_pound: json_object["key_price_per_pound"].to_f,
        roasted_on_import: pounds_roasted,
        crop: @crop,
        status: 'open',
        contract_open: Time.now(),
        label: json_object["key_label"],
        name: json_object["key_name"],
        low_on_hand: json_object["key_on_hand_par_level"].to_f,
        low_remaining: json_object["key_warehouse_par_level"].to_f
      )
      LedgerServices::AssetIssueTransaction.new(pounds_of_coffee, @crop.id, @roaster.id).call
      LedgerServices::AssetTransferTransaction.new(pounds_of_coffee.to_f, @lot.id, @roaster.id).call
      LedgerServices::AssetDeliveryTransaction.new(pounds_on_hand + pounds_roasted, @lot.id, @roaster.id).call
      if @lot.save
        return {all_succeeded: true}
      else
        return {all_succeeded: false, errors: @lot.errors}
      end
    end
  end
end
