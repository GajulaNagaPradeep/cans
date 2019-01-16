# frozen_string_literal: true

module Staff
  class StaffRepository
    def initialize(token = nil, http_service = Infrastructure::HttpService.new)
      @token = token
      @http_service = http_service
    end

    def subordinates_index
      @http_service.call('/staff/subordinates', :get, @token)
    end

    def show(id)
      @http_service.call("/staff/#{id}", :get, @token)
    end

    def social_worker_clients(id)
      @http_service.call("/staff/#{id}/people", :get, @token)
    end

    def assessments
      @http_service.call('/staff/assessments/latest', :get, @token)
    end
  end
end
