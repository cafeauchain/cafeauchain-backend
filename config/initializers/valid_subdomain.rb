class ValidSubdomain
  def self.matches? request
    if RoasterProfile.pluck(:subdomain).include?(request.subdomain)
      puts RoasterProfile.pluck(:subdomain).include?(request.subdomain)
      return true
    else
      puts RoasterProfile.pluck(:subdomain).include?(request.subdomain)
      return false
    end
  end
end
