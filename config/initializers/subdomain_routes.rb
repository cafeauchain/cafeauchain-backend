class SubdomainRoutes
  def self.matches? request
    case request.subdomain
    when '', 'www', 'demo'
      true
    else
      false
    end
  end
end