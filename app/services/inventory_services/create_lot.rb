module InventoryServices
  class CreateLot
    
    def initialize(roaster_profile_id, crop_id, params)
      @roaster = RoasterProfile.find(roaster_profile_id)
      @crop    = Crop.find(crop_id)
      @params = params
    end

    def call
      self.lot_creation
      self.asset_issue_tx
      self.lot_transfer_tx
      self.batch_creation
      self.roasted_tx
    end

    def lot_creation
      @lot = @roaster.lots.create(harvest_year: @params[:harvest_year], pounds_of_coffee: @params[:lot_size],
                               price_per_pound: @params[:price_per_pound], crop: @crop)
    end

    def asset_issue_tx
      @transaction = @crop.transactions.create(roaster_profile: @roaster,
                                            trans_type: "asset_issue", quantity: @params[:lot_size])
    end

    def lot_transfer_tx
      @transfer = @crop.transactions.create(lot: @lot, roaster_profile: @roaster,
                                         trans_type: "asset_transfer", quantity: @params[:on_hand])
      
    end

    def batch_creation
      @batch = @lot.batches.create(starting_amount: @params[:roasted].to_f, ending_amount: (@params[:roasted].to_f * 0.9))
    end

    def roasted_tx
      @roasted = @lot.transactions.new(batch: @batch, roaster_profile: @roaster,
                                       trans_type: "roasted", quantity: @params[:roasted])
      if @roasted.save
        return @lot
      else
        return false
      end
    end

  end
end