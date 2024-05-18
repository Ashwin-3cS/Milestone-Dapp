






// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MilestoneDapp {
    struct Place {
        string name;
        uint256 rating;
    }

    struct Milestone {
        mapping(uint256 => Place) places; // Use mapping instead of array
        uint256 placesSize; // Track the size of the places mapping
        address creator;
    }

    mapping(address => Milestone[]) public userMilestones;

    function createMilestone(string[] memory _placeNames) external {
        Milestone storage newMilestone = userMilestones[msg.sender].push();
        newMilestone.creator = msg.sender;

        for (uint256 i = 0; i < _placeNames.length; i++) {
            newMilestone.places[i].name = _placeNames[i];
            newMilestone.places[i].rating = 0;
        }
        newMilestone.placesSize = _placeNames.length;
    }

    function sendEther(address _milestoneCreator, uint256 _amount) external payable {
        require(msg.value == _amount, "Incorrect amount sent");

        payable(_milestoneCreator).transfer(_amount);
    }

    // Function to get milestones for a user
    function getMilestones(address _user) external view returns (string[][] memory, uint256[] memory) {
        uint256 milestoneCount = userMilestones[_user].length;
        string[][] memory placeNames = new string[][](milestoneCount);
        uint256[] memory placesSizes = new uint256[](milestoneCount);

        for (uint256 i = 0; i < milestoneCount; i++) {
            Milestone storage milestone = userMilestones[_user][i];
            uint256 placesSize = milestone.placesSize;
            placesSizes[i] = placesSize;
            string[] memory names = new string[](placesSize);

            for (uint256 j = 0; j < placesSize; j++) {
                names[j] = milestone.places[j].name;
            }
            placeNames[i] = names;
        }

        return (placeNames, placesSizes);
    }

    // Fallback function to receive ether
    receive() external payable {}
}

