json.extract! roaster_profile, :id, :name, :location, :slug, :url, :twitter, :facebook, :created_at, :updated_at
json.url roaster_profile_url(roaster_profile, format: :json)
