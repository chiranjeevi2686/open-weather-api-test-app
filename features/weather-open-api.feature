Feature: Open weather api's tests
  @sit
  Scenario: Registration without an API key, results 401 status and error validation
    Given User register a weather station without an api key and validates error message
  @sit
  Scenario: Registration with a valid API key, results 201 status
    Given User register a weather station with a valid api key and id DEMO_TEST001
  @sit
  Scenario: Registration with a valid API key, results 201 status
    Given User register a weather station with a valid api key and id DEMO_TEST002
  @sit
  Scenario: Retrieving registered stations using GET, results a 200 status and data validation
    Given User retrieves registered stations and verify the data to be correct


