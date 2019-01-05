json.extract! roaster_profile, :id, :name, :about, :slug, :url, :twitter, :facebook, :created_at, :updated_at, :address_1, :address_2, :city, :state, :zip_code
if roaster_profile.logo.attached?
    json.img_url request.base_url + url_for(roaster_profile.logo)
else
    json.img_url nil
end
