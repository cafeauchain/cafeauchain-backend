class CustomMailer < Devise::Mailer   
  default template_path: 'devise/mailer' 

  def reset_password_instructions(record, token, options={})
   if !record.customer_profile_id.blank?
     options[:template_name] = 'customer_reset_password_instructions'
     @roaster = RoasterProfile.find(record[:roaster_profile_id])
     record[:roaster_profile_id] = nil
     record.save
   else
     options[:template_name] = 'reset_password_instructions'
   end
   super
  end
end