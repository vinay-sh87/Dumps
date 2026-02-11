package org.example.service;

import org.example.dao.BookDAO;
import org.example.dao.BorrowDAO;
import org.example.dao.MemberDAO;
import org.example.exception.MemberNotFoundException;
import org.example.model.BorrowRecord;
import org.example.model.Member;

import java.util.List;
import java.util.regex.Pattern;

public class MemberService {
    private final MemberDAO memberDAO;
    private final BorrowDAO borrowDAO;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    public MemberService(BorrowDAO borrowDAO, MemberDAO memberDAO) {
        this.borrowDAO = borrowDAO;
        this.memberDAO = memberDAO;
    }

    // register member
    public String registerMember(String firstName, String lastName, String email, String phone, String address) {
        validateMemberInput(firstName, email);
        String memberId = memberDAO.generateNextMemberId();
        Member member = new Member(memberId, firstName, lastName, email, phone, address);
        memberDAO.addMember(member);
        return memberId;
    }

    // get member by member id
    public Member getMemberByMemberId(String memberId) {
        if (memberId == null || memberId.trim().isEmpty()) {
            throw new IllegalArgumentException("Member id cannot be empty");
        }
        return memberDAO.getMemberByMemberId(memberId);
    }

    // get member by database id
    public Member getMemberByDatabaseId(int memberId) {
        if (memberId <= 0) {
            throw new IllegalArgumentException("Invalid member id");
        }
        return memberDAO.getMemberById(memberId);
    }

    // get all members
    public List<Member> getAllMembers() {
        return memberDAO.getAllMembers();
    }

    // get active members
    public List<Member> getActiveMembers() {
        return memberDAO.getMembersByStatus("active");
    }

    // search members by name
    public List<Member> searchMembers(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            throw new IllegalArgumentException("search term cannot be empty");
        }
        return memberDAO.searchMembersByName(searchTerm);
    }

    // update member information
    public void updateMember(String memberId, String firstName, String lastName, String email, String phone, String address) {
        validateMemberInput(firstName, email);
        Member member = memberDAO.getMemberByMemberId(memberId);
        member.setFirstName(firstName);
        member.setLastName(lastName);
        member.setEmail(email);
        member.setPhone(phone);
        member.setAddress(address);
        memberDAO.updateMemberDetails(member);
    }

    // suspend a member
    public void suspendMember(String memberId, String reason) {
        Member member = memberDAO.getMemberByMemberId(memberId);
        if (member.getStatus().equals("suspended")) {
            System.out.println("Member is already suspended...");
            return;
        }
        memberDAO.updateMemberStatus(member.getId(), "suspended");
        System.out.println("Member suspended reason : " + reason);
    }

    // reactivate a suspended member
    public void reactivateMember(String memberId) {
        Member member = memberDAO.getMemberByMemberId(memberId);
        if (member.getStatus().contains("active")) {
            System.out.println("Member is already active...");
            return;
        }
        memberDAO.updateMemberStatus(member.getId(), "active");
        System.out.println("Member reactivated successfully...");
    }

    // delete a member
    public void deleteMember(String memberId) {
        Member member = memberDAO.getMemberByMemberId(memberId);

        List<BorrowRecord> currentBorrowsByMember = borrowDAO.getCurrentBorrowsByMember(member.getId());
        if (!currentBorrowsByMember.isEmpty()) {
            throw new IllegalStateException("Member cannot be deleted they have " + currentBorrowsByMember.size() + " unreturned books");
        }
        memberDAO.deleteMember(member.getId());
    }

    // check if member exists
    public boolean memberExists(String memberId) {
        try {
            memberDAO.getMemberByMemberId(memberId);
            return true;
        } catch (MemberNotFoundException e) {
            return false;
        }
    }

    // check if member is active
    public boolean isMemberActive(String memberId) {
        try {
            Member member = memberDAO.getMemberByMemberId(memberId);
            return member.getStatus().equals("active");
        } catch (MemberNotFoundException e) {
            return false;
        }
    }

    // get total member count
    public int getTotalMembersCount(){
        return memberDAO.getTotalMembersCount();
    }

    // get total active members count
    public int getActiveMembersCount(){
        return memberDAO.getActiveMembersCount();
    }


    // validation
    private void validateMemberInput(String firstName, String email) {
        if (firstName == null || firstName.trim().isEmpty()) {
            throw new IllegalArgumentException("First name cannot be empty");
        }
        if (email == null || !EMAIL_PATTERN.matcher(email).matches()) {
            throw new IllegalArgumentException("Invalid email address...");
        }
    }
}
