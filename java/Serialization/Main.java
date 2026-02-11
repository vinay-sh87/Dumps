
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class Member implements Serializable {
    private static final long serialVersionUID = 1L;
    private String memberCode;
    private String name;
}

public class Main {
    public static void main(String args[]) throws IOException {
        Member member = new Member();
        ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("member.ser"));
        out.writeObject(member);
        out.close();
        
    }
}
