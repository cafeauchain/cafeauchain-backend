class ValidSubdomain
  def self.matches? request
    if RoasterProfile.pluck(:subdomain).include?(request.subdomain)
      true
    else
      false
    end
  end
end
