class SetupDefaultCutoffTimesForAllRoasters < ActiveRecord::Migration[5.2]
  def up
    RoasterProfile.all.each{|roaster|
      if roaster.cutoff.nil?
        Cutoff.create(roaster_profile_id: roaster.id, day_1: '00:00', day_2: '00:00', day_3: '00:00', day_4: '00:00', day_5: '00:00')
      end
    }
  end
end
