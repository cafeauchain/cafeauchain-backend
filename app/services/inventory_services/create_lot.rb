module InventoryServices
  class CreateLot

    def initialize(roaster_profile_id, crop_id, params)
      @roaster = RoasterProfile.find(roaster_profile_id)
      @crop    = Crop.find(crop_id)
      @params = params[:lotDetails]
    end

    def call
      @lot = self.lot_creation
      LedgerServices::AssetIssueTransaction.new(@params[:lot_size].to_f, @crop.id, @roaster.id).call
      LedgerServices::AssetTransferTransaction.new(@params[:lot_size].to_f, @lot.id, @roaster.id).call
      LedgerServices::AssetDeliveryTransaction.new(@params[:on_hand].to_f + @params[:roasted].to_f, @lot.id, @roaster.id).call
    end

    def lot_creation
      pounds_of_coffee = @params[:lot_size].to_f
      pounds_on_hand = @params[:on_hand].to_f
      pounds_roasted = @params[:roasted].to_f
      @lot = @roaster.lots.create(
        label: @params[:label],
        name: @params[:name],
        harvest_year: @params[:harvest_year],
        origin: @params[:origin],
        pounds_of_coffee: pounds_of_coffee,
        price_per_pound: @params[:price_per_pound].to_f,
        crop: @crop,
        status: 'open',
        contract_open: Time.now(),
        low_on_hand: @params[:low_on_hand].to_f,
        low_remaining: @params[:low_remaining].to_f,
        roasted_on_import: pounds_roasted
      )      
    end

  end
end
