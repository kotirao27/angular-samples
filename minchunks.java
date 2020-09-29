
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;



class minchunks {

    /*
     * Complete the 'minimumChunksRequired' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts following parameters:
     *  1. LONG_INTEGER totalPackets
     *  2. 2D_LONG_INTEGER_ARRAY uploadedChunks
     */

    public static int minimumChunksRequired(long totalPackets, List<List<Long>> uploadedChunks) {
    	List<Integer> s=Arrays.asList(2,2,2,5,5,8);
    	int[] a=s.stream().mapToInt(x->x).toArray();
    	int chunks=totalPackets/uploadedChunks.size();
    	int size=a.length/chunks+((a.length%chunks)>0?1:0);
    	int[][] arrays=new int[size][];
    	for(int i=0;i<(a.length%chunks>0?chunks-1:chunks);i++) {
    		arrays[i]=(Arrays.copyOfRange(a, i, Math.min(a.length, i+chunks)));
    	}
    	System.out.println(arrays);

    }

}


public class Car {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        long totalPackets = Long.parseLong(bufferedReader.readLine().trim());

        int uploadedChunksRows = Integer.parseInt(bufferedReader.readLine().trim());
        int uploadedChunksColumns = Integer.parseInt(bufferedReader.readLine().trim());

        List<List<Long>> uploadedChunks = new ArrayList<>();

        IntStream.range(0, uploadedChunksRows).forEach(i -> {
            try {
                uploadedChunks.add(
                    Stream.of(bufferedReader.readLine().replaceAll("\\s+$", "").split(" "))
                        .map(Long::parseLong)
                        .collect(toList())
                );
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

        int result = Result.minimumChunksRequired(totalPackets, uploadedChunks);

        bufferedWriter.write(String.valueOf(result));
        bufferedWriter.newLine();

        bufferedReader.close();
        bufferedWriter.close();
    }
}
