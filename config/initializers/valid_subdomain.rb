class ValidSubdomain
  def self.matches? request
    if RoasterProfile.pluck(:subdomain).include?(request.subdomain)
      false
    else
      true
    end
  end
end
