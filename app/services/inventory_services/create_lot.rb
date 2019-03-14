module InventoryServices
  class CreateLot
    
    def initialize(roaster_profile_id, crop_id, params)
      @roaster = RoasterProfile.find(roaster_profile_id)
      @crop    = Crop.find(crop_id)
      @params = params[:lotDetails]
    end

    def call
      @lot = self.lot_creation
      LedgerServices::AssetIssueTransaction.new(@params[:lot_size], @crop.id, @roaster.id).call
      LedgerServices::AssetTransferTransaction.new(@params[:on_hand], @lot.id, @roaster.id).call
      LedgerServices::AssetDeliveryTransaction.new(@params[:on_hand], @lot.id, @roaster.id).call
    end

    def lot_creation
      @lot = @roaster.lots.create(label: @params[:label], name: @params[:name],harvest_year: @params[:harvest_year], pounds_of_coffee: @params[:lot_size], price_per_pound: @params[:price_per_pound], crop: @crop)
    end

  end
end