Feature: Package Manager
    As a Package Manager
    I want to manage package file
    So that I can use it

    Background: prepare
        Given prepare

    Rule: convertAllFileData

        # Scenario: not check dependent data
        #     Given generate two extensions that version not match
        #     # And prepare new names
        #     And load them as l1
        #     When convert l1
        #     Then not error

        Scenario: convert allExtensionFileData and allContributeFileData
            Given generate two extensions that the seond is entry
            And generate one contribute
            # And prepare new names
            And load them as l1
            When convert l1
            Then converted package data is correct

    Rule: load generated package

        # Background: prepare flag
        #     Given prepare flag

        Scenario: load generated package
            Given generate two extensions
            And generate one contribute
            # And prepare new names and mark the second extension as entry
            And mark the second extension as entry
            And load them and convert as c1
            # And prepare config data
            When generate package with c1 and load it
            Then the two extensions should be registered
            And the one contribute should be registered
            And load result should has entry extension name
        # And the second extension should be started

        Scenario: load generated package which contains other packages
            Given generate one extension as e1
            And mark e1 as entry
            And load e1 and convert as c1
            And generate package p1 with c1
            And generate two extensions
            And generate one contribute
            And mark the second extension(e3) as entry
            And load them and convert as c2
            When generate package p2 with c2, p1 and load it
            Then the three extensions should be registered
            And the one contribute should be registered
            And load result should has entry extension name of e3

    Rule: load and handle generated package

        Background: prepare for load and handle generated package
            Given prepare flag
            And generate two extensions
            # And prepare new names and mark the second extension as entry
            And mark the second extension as entry
            And load them and convert as c1

        Scenario: load and init generated package
            When generate package with c1 and load it and init the entry extension
            Then the second extension should be inited

        Scenario: load and invoke generated package's entry extension's service
            When generate package with c1 and load it and invoke the entry extension's service
            Then the second extension's service should be invoked


    #     Scenario: load and update generated package
    #         When generate package with c1 and load it and update the second extension
    #         Then the second extension should be updated