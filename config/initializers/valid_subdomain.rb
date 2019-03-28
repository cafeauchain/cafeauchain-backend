class ValidSubdomain
  def self.matches? request
    if RoasterProfile.pluck(:subdomain).include?(request.subdomain)
      return true
    else
      return false
    end
  end
end
